<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import ImageComp from './Image.vue';
import VideoComp from './Video.vue';

export type MediaItem = {
    type: 'photo' | 'video';
    src: string;
    alt?: string;
    width?: number;
    height?: number;
};

const props = defineProps<{
    media: MediaItem[];
    /** 阈值：宽/高 >= threshold 则判定为横向大图，默认 1.3 */
    wideThreshold?: number;
}>();

const threshold = props.wideThreshold ?? 1.3;

// 内部表示，附带 isWide 标记
const items = ref(
    (props.media || []).map(m => ({
        ...m,
        isWide: m.width && m.height ? m.width / m.height >= threshold : false,
    }))
);

watch(
    () => props.media,
    val => {
        items.value = (val || []).map(m => ({
            ...m,
            isWide: m.width && m.height ? m.width / m.height >= threshold : false,
        }));
        // 重新测量那些没有尺寸的
        measureAll();
    },
    { deep: true }
);

function measureImage(src: string, idx: number) {
    return new Promise<void>(resolve => {
        try {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const w = img.naturalWidth || img.width || 1;
                const h = img.naturalHeight || img.height || 1;
                items.value[idx].isWide = w / h >= threshold;
                resolve();
            };
            img.onerror = () => {
                // keep default (false)
                resolve();
            };
        } catch {
            resolve();
        }
    });
}

function measureVideo(src: string, idx: number) {
    return new Promise<void>(resolve => {
        try {
            const v = document.createElement('video');
            v.preload = 'metadata';
            v.src = src;
            const onMeta = () => {
                const w = v.videoWidth || 1;
                const h = v.videoHeight || 1;
                items.value[idx].isWide = w / h >= threshold;
                cleanup();
                resolve();
            };
            const onErr = () => {
                cleanup();
                resolve();
            };
            function cleanup() {
                v.removeEventListener('loadedmetadata', onMeta);
                v.removeEventListener('error', onErr);
                try {
                    v.src = '';
                } catch {
                    /* ignore */
                }
            }
            v.addEventListener('loadedmetadata', onMeta);
            v.addEventListener('error', onErr);
        } catch {
            resolve();
        }
    });
}

async function measureAll() {
    // 测量那些没有 width/height 的媒体
    const promises: Promise<void>[] = [];
    items.value.forEach((it, idx) => {
        if (it.width && it.height) return; // 已有尺寸
        if (it.type === 'photo') {
            promises.push(measureImage(it.src, idx));
        } else {
            promises.push(measureVideo(it.src, idx));
        }
    });
    await Promise.all(promises);
}

onMounted(() => {
    // 组件挂载后，对无尺寸项进行测量
    measureAll();
});
</script>

<template>
    <div class="w-full">
        <!-- 两列 (默认)，md 及以上 4 列 -->
        <div class="grid grid-flow-row-dense grid-cols-2 gap-3 rounded-xl md:grid-cols-4 md:gap-4">
            <div
                v-for="(item, idx) in items"
                :key="item.src + '-' + idx"
                :class="[
                    item.isWide ? 'md:col-span-2' : 'md:col-span-1',
                    'col-span-1',
                    'relative h-full overflow-hidden rounded-xl border-2 shadow-lg transition-all duration-300',
                    'border-primary/20 from-background to-primary/5 bg-gradient-to-br',
                    'hover:border-primary/40 hover:shadow-primary/10 hover:scale-102 hover:shadow-xl',
                ]">
                <component
                    :is="item.type === 'photo' ? ImageComp : VideoComp"
                    :src="item.src"
                    :alt="item.alt || ''"
                    class="transition-transform duration-300" />
            </div>
        </div>
    </div>
</template>
