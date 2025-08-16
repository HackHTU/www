<script setup lang="ts">
// 统一部位交互注册机制
type PartActionType = 'bone' | 'vmd';
interface PartAction {
    name: string; // 骨骼名或mesh名
    type: PartActionType;
    vmdUrl?: string; // type=vmd时必填
    onTrigger?: () => void; // type=bone时可选
    sphereSize?: number; // 判定球半径
}
const partActions = ref<PartAction[]>([]);
const partSpheres = ref<{ [name: string]: Mesh }>({});

/**
 * 注册一个部位交互
 * @param action 部位交互配置
 */
function registerPartAction(action: PartAction) {
    partActions.value.push(action);
}

// 头部交互注册（默认）
registerPartAction({
    name: 'head',
    type: 'bone',
    sphereSize: 1.8,
    onTrigger: triggerHeadNod,
});
// resize 相关
const minWidth = 200;
const minHeight = 200;
const resizing = ref(false);
const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0 });

function startResize(e: PointerEvent) {
    e.stopPropagation();
    resizing.value = true;
    resizeStart.value = {
        x: e.clientX,
        y: e.clientY,
        width: width.value,
        height: height.value,
    };
    window.addEventListener('pointermove', onResizing);
    window.addEventListener('pointerup', stopResize);
}

function onResizing(e: PointerEvent) {
    if (!resizing.value) return;
    const dx = e.clientX - resizeStart.value.x;
    const dy = e.clientY - resizeStart.value.y;
    width.value = Math.max(minWidth, resizeStart.value.width + dx);
    height.value = Math.max(minHeight, resizeStart.value.height + dy);
}

function stopResize() {
    resizing.value = false;
    window.removeEventListener('pointermove', onResizing);
    window.removeEventListener('pointerup', stopResize);
}
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import type { Object3D, Bone, AnimationClip, AnimationAction, SkinnedMesh } from 'three';
import {
    AmbientLight,
    Audio as ThreeAudio,
    AudioListener,
    AudioLoader,
    Clock,
    Color,
    DirectionalLight,
    PerspectiveCamera,
    Raycaster,
    Scene,
    SphereGeometry,
    Vector2,
    WebGLRenderer,
    MeshBasicMaterial,
    Mesh,
    AnimationMixer,
} from 'three';
import { OrbitControls } from 'three-stdlib';
import { MMDLoader } from 'three-stdlib';

const canPlayVmd = computed(() => !!props.vmdUrls && props.vmdUrls.length > 0 && !!modelRef.value);

// 音频对象提升到组件作用域
let audio: ThreeAudio | null = null; // three.js 音频对象
let audioBuffer: AudioBuffer | null = null; // 缓存音频 buffer，避免重复加载
let audioListener: AudioListener | null = null; // three.js 音频监听器
const audioLoader = new AudioLoader(); // three.js 音频加载器

// 动画播放状态
// 动画播放状态
const isPlaying = ref(false); // 当前动画是否正在播放
let lastClip: AnimationClip | null = null; // 上一次播放的动画片段
let lastAction: AnimationAction | null = null; // 上一次动画的 action

/**
 * 加载并播放 VMD 动画，并同步播放音频
 * @param animationUrl VMD 动画文件路径
 */
async function playAnimation(animationUrl: string) {
    if (!modelRef.value) return;
    const loader = new MMDLoader();
    return new Promise<void>((resolve, reject) => {
        loader.loadAnimation(
            animationUrl,
            modelRef.value as SkinnedMesh,
            clipOrMesh => {
                // 兼容类型：clipOrMesh 可能是 AnimationClip 或 SkinnedMesh
                const animClip = (clipOrMesh as AnimationClip).tracks
                    ? (clipOrMesh as AnimationClip)
                    : null;
                if (!animClip) return reject('VMD 加载失败');
                if (!mixerRef.value) {
                    mixerRef.value = new AnimationMixer(modelRef.value!);
                }
                mixerRef.value.stopAllAction();
                const action = mixerRef.value.clipAction(animClip);
                action.reset();
                action.play();
                lastClip = animClip;
                lastAction = action;
                isPlaying.value = true;

                // 播放音频（如有）
                if (props.audioUrl && cameraRef.value) {
                    if (!audioListener) {
                        audioListener = new AudioListener();
                        cameraRef.value.add(audioListener);
                    }
                    if (!audio) {
                        audio = new ThreeAudio(audioListener);
                    }
                    // 如果已加载buffer直接播放，否则先加载
                    const doPlay = () => {
                        if (!audio) return;
                        audio.setLoop(true);
                        audio.setVolume(0.6);
                        audio.play();
                    };
                    if (audioBuffer) {
                        audio.setBuffer(audioBuffer);
                        doPlay();
                    } else {
                        audioLoader.load(props.audioUrl!, (buffer: AudioBuffer) => {
                            audioBuffer = buffer;
                            audio!.setBuffer(buffer);
                            doPlay();
                        });
                    }
                }
                resolve();
            },
            undefined,
            reject
        );
    });
}

/**
 * 停止并重置动画和音频到初始状态
 */
function stopAndResetAnimation() {
    if (mixerRef.value && lastAction && lastClip && modelRef.value) {
        lastAction.stop();
        lastAction.reset();
        // 尝试重置模型骨骼到初始状态（部分MMD模型支持）
        const mesh = modelRef.value as Partial<SkinnedMesh> & { pose?: () => void };
        if (typeof mesh.pose === 'function') {
            mesh.pose();
        }
    }
    if (audio) {
        audio.stop();
        if (audioBuffer) {
            audio.setBuffer(audioBuffer);
        }
    }
    isPlaying.value = false;
}

async function onPlayVmdClick() {
    if (!props.vmdUrls || !props.vmdUrls.length) return;
    if (isPlaying.value) {
        stopAndResetAnimation();
    } else {
        await playAnimation(props.vmdUrls[0]);
    }
}

interface PmxWidgetProps {
    modelUrl: string;
    vmdUrls?: string[];
    audioUrl?: string;
    title?: string;
    width?: number;
    height?: number;
    initialPosition?: { x: number; y: number };
}

const props = defineProps<PmxWidgetProps>();

const width = ref(props.width ?? 320);
const height = ref(props.height ?? 420);
const title = props.title ?? 'PMX Widget';
const initialPosition = props.initialPosition ?? { x: 24, y: 24 };

const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const rendererRef = ref<WebGLRenderer | null>(null);
const sceneRef = ref<Scene | null>(null);
const cameraRef = ref<PerspectiveCamera | null>(null);
const controlsRef = ref<OrbitControls | null>(null);
const mixerRef = ref<AnimationMixer | null>(null);
const headTargetRef = ref<Mesh | null>(null);
const clockRef = ref<Clock>(new Clock());
const animationIdRef = ref<number | null>(null);
const modelRef = ref<Object3D | null>(null);
const isHeadNoddingRef = ref(false);
const pointerRef = ref<Vector2>(new Vector2());
const raycasterRef = ref<Raycaster>(new Raycaster());

// 拖拽状态
const drag = ref({ active: false, offsetX: 0, offsetY: 0 });
const pos = ref({ ...initialPosition });

// 拖拽事件
function startDrag(e: PointerEvent) {
    const box = containerRef.value?.getBoundingClientRect();
    if (!box) return;
    drag.value = {
        active: true,
        offsetX: e.clientX - box.left,
        offsetY: e.clientY - box.top,
    };
}

function onPointerMove(e: PointerEvent) {
    if (!drag.value.active) return;
    pos.value = { x: e.clientX - drag.value.offsetX, y: e.clientY - drag.value.offsetY };
}
function onPointerUp() {
    drag.value = { active: false, offsetX: 0, offsetY: 0 };
}

onMounted(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
});
onUnmounted(() => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
});

// three.js 初始化和模型加载
const setupThree = async () => {
    await nextTick();
    if (!canvasRef.value) return;
    // Renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: canvasRef.value });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width.value, height.value, false);
    if (canvasRef.value) {
        canvasRef.value.style.width = width.value + 'px';
        canvasRef.value.style.height = height.value + 'px';
    }
    renderer.setClearColor(new Color(0x000000), 0);
    rendererRef.value = renderer;

    // Scene & Camera
    const scene = new Scene();
    sceneRef.value = scene;
    const camera = new PerspectiveCamera(40, width.value / height.value, 0.1, 1000);
    camera.position.set(0, 12, 28);
    cameraRef.value = camera;

    // Lights
    scene.add(new AmbientLight(0xffffff, 0.7));
    const dir = new DirectionalLight(0xffffff, 0.6);
    dir.position.set(10, 20, 10);
    scene.add(dir);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 12;
    controls.maxDistance = 40;
    controlsRef.value = controls;

    // MMD Loader
    const loader = new MMDLoader();
    let stopped = false;

    function loadModelAsync(url: string): Promise<Object3D> {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        });
    }
    // VMD 动画加载（可选）

    try {
        const mesh = await loadModelAsync(props.modelUrl);
        if (stopped) return;
        modelRef.value = mesh;
        mesh.position.y = -10;
        scene.add(mesh);

        // 统一注册所有部位交互
        const bones: Bone[] = ((mesh as unknown as { skeleton?: { bones?: Bone[] } })?.skeleton
            ?.bones || []) as Bone[];
        partActions.value.forEach(action => {
            // 支持骨骼名模糊匹配
            const bone = bones.find(
                b =>
                    b.name === action.name ||
                    (b.name === '頭' && action.name === 'head') ||
                    (b.name === '頭部' && action.name === 'head') ||
                    b.name.toLowerCase?.().includes(action.name.toLowerCase?.())
            );
            if (bone) {
                const sphere = new Mesh(
                    new SphereGeometry(action.sphereSize || 1.5, 16, 16),
                    new MeshBasicMaterial({
                        color: 0xff00ff,
                        transparent: true,
                        opacity: 0,
                        depthWrite: false,
                    })
                );
                bone.add(sphere);
                partSpheres.value[action.name] = sphere;
                if (action.name === 'head') headTargetRef.value = sphere;
            }
        });

        // 音频不再自动播放，改为点击播放动画时播放
    } catch (error) {
        console.error('MMD load error', error);
    }

    // 渲染循环
    const clock = clockRef.value;
    const animate = () => {
        animationIdRef.value = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixerRef.value) mixerRef.value.update(delta);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    // resize
    const handleResize = () => {
        if (!rendererRef.value || !cameraRef.value) return;
        rendererRef.value.setSize(width.value, height.value);
        cameraRef.value.aspect = width.value / height.value;
        cameraRef.value.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    // 监听width/height变化，动态调整渲染器和相机
    watch([width, height], ([w, h]: [number, number]) => {
        if (rendererRef.value && cameraRef.value) {
            rendererRef.value.setSize(w, h, false);
            if (canvasRef.value) {
                canvasRef.value.style.width = w + 'px';
                canvasRef.value.style.height = h + 'px';
            }
            cameraRef.value.aspect = w / h;
            cameraRef.value.updateProjectionMatrix();
            // 重置相机位置和controls目标，保证人物居中
            cameraRef.value.position.set(0, 12, 28);
            cameraRef.value.lookAt(0, 0, 0);
            if (controlsRef.value) {
                controlsRef.value.target.set(0, 0, 0);
                controlsRef.value.update();
            }
        }
    });

    // 清理逻辑移到组件setup的onUnmounted中
    // ...existing code...
};

onMounted(() => {
    setupThree();
});

onUnmounted(() => {
    window.removeEventListener('resize', () => {}); // 这里 handleResize 需全局可访问，见下
    if (animationIdRef.value) cancelAnimationFrame(animationIdRef.value);
    if (controlsRef.value) controlsRef.value.dispose();
    if (rendererRef.value) {
        rendererRef.value.dispose();
        rendererRef.value.forceContextLoss();
    }
    if (headTargetRef.value) {
        headTargetRef.value.geometry.dispose();
        (headTargetRef.value.material as unknown as { dispose?: () => void })?.dispose?.();
    }
    if (modelRef.value && sceneRef.value) {
        sceneRef.value.remove(modelRef.value);
    }
});

// 头部点击交互
function triggerHeadNod() {
    if (!modelRef.value || isHeadNoddingRef.value) return;
    const bones: Bone[] = ((modelRef.value as unknown as { skeleton?: { bones?: Bone[] } })
        ?.skeleton?.bones || []) as Bone[];
    const head = bones.find(
        b => b.name === '頭' || b.name === '頭部' || b.name.toLowerCase?.().includes('head')
    );
    if (!head) return;
    isHeadNoddingRef.value = true;
    const startRotX = head.rotation.x;
    const targetDown = startRotX + 0.35;
    const targetUp = startRotX - 0.18;
    const duration = 550;
    const start = performance.now();
    const step = (now: number) => {
        const t = now - start;
        const half = duration / 2;
        if (t < half) {
            const k = t / half;
            head.rotation.x = startRotX + (targetDown - startRotX) * easeOutQuad(k);
        } else if (t < duration) {
            const k = (t - half) / half;
            head.rotation.x = targetDown + (targetUp - targetDown) * easeInOutQuad(k);
        } else {
            head.rotation.x = startRotX;
            isHeadNoddingRef.value = false;
            return;
        }
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function easeOutQuad(t: number) {
    return t * (2 - t);
}
function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// 头部点击事件
function onCanvasPointerDown(e: PointerEvent) {
    if (!rendererRef.value || !cameraRef.value || !sceneRef.value || !canvasRef.value) return;
    const rect = canvasRef.value.getBoundingClientRect();
    pointerRef.value.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.value.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = raycasterRef.value;
    raycaster.setFromCamera(pointerRef.value, cameraRef.value);
    // 收集所有注册部位的判定sphere
    const targets: Mesh[] = Object.values(partSpheres.value);
    const hits = raycaster.intersectObjects(targets, true);
    if (hits.length > 0) {
        // 找到命中的sphere对应的action
        const hitMesh = hits[0].object;
        const entry = Object.entries(partSpheres.value).find(
            ([, mesh]) => mesh === hitMesh || mesh.uuid === hitMesh.uuid
        );
        if (entry) {
            const [hitName] = entry;
            const action = partActions.value.find(a => a.name === hitName);
            if (action) {
                if (action.type === 'bone' && action.onTrigger) {
                    action.onTrigger();
                } else if (action.type === 'vmd' && action.vmdUrl) {
                    playAnimation(action.vmdUrl);
                }
            }
        }
    }
}

onMounted(() => {
    if (canvasRef.value) {
        canvasRef.value.addEventListener('pointerdown', onCanvasPointerDown);
    }
});
onUnmounted(() => {
    if (canvasRef.value) {
        canvasRef.value.removeEventListener('pointerdown', onCanvasPointerDown);
    }
});
</script>

<template>
    <div
        ref="containerRef"
        :style="{
            left: pos.x + 'px',
            top: pos.y + 'px',
            width: width + 'px',
            height: height + 'px',
        }"
        class="shadow-primary fixed z-50 overflow-hidden rounded-lg border bg-neutral-500/20 shadow-xs backdrop-blur-xs select-none">
        <header
            aria-label="Drag widget"
            class="bg-accent/60 flex cursor-grab items-center gap-2 rounded-t-lg border-b px-3 py-2 active:cursor-grabbing"
            @pointerdown="startDrag">
            <h2 class="text-foreground truncate text-sm font-medium">
                {{ title }}
            </h2>

            <span class="text-foreground/70 text-xs">Beta</span>
        </header>
        <main class="h-[calc(100%-44px)] w-full">
            <canvas
                ref="canvasRef"
                class="block h-full w-full"
                aria-label="PMX canvas"
                role="img" />
        </main>
        <button
            v-if="canPlayVmd"
            title="播放"
            class="bg-primary/80 absolute bottom-2 left-2 z-60 flex size-8 items-center justify-center rounded-full p-2 text-white shadow"
            @click="onPlayVmdClick">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <polygon points="5,3 17,10 5,17" />
            </svg>
        </button>
        <!-- 右下角resize手柄 -->
        <div
            class="absolute right-2 bottom-2 z-60 flex h-6 w-6 cursor-nwse-resize items-end justify-end"
            style="user-select: none"
            @pointerdown="startResize">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4" stroke="#888" stroke-width="2" stroke-linecap="round" />
                <path d="M10 16L16 10" stroke="#888" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
    </div>
</template>
