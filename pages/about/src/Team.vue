<template>
    <section>
        <div ref="wrap" class="card flex gap-8">
            <h2 class="text-split-animation mb-6 text-3xl font-bold">团队成员</h2>

            <div class="flex gap-2">
                <div
                    v-for="(p, idx) in people"
                    :key="idx"
                    class="group person-card relative flex min-w-50 grow-1 basis-0 flex-col items-center justify-end rounded-3xl border-2 border-neutral-200 bg-neutral-800 p-3 text-neutral-50 transition-all hover:grow-2">
                    <div
                        class="avatar-wrap absolute top-10 mb-2 size-20 overflow-hidden rounded-full border-3 border-neutral-400/20 transition-all group-hover:top-5 group-hover:left-5 group-hover:size-10">
                        <img :src="p.img" alt="p.name" class="h-full w-full object-cover" />
                    </div>

                    <div class="flex flex-col gap-1 p-2 group-hover:text-right">
                        <h3
                            class="text-2xl font-semibold transition-all group-hover:mt-20 group-hover:text-6xl group-hover:text-shadow-[2px_2px_0px_#22c55e]">
                            {{ p.name }}
                        </h3>
                        <span
                            class="person-role text-sm opacity-80 transition-all group-hover:text-xl">
                            {{ p.role }}
                        </span>
                        <span
                            class="person-desc text-sm leading-relaxed opacity-70 transition-all group-hover:text-lg">
                            {{ p.desc }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, toRefs, useTemplateRef } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    people: {
        type: Array<{ name: string; role: string; img: string; desc: string }>,
        default: [],
    },
});

const { people } = toRefs(props);
const wrap = useTemplateRef('wrap');

onMounted(() => {
    const panel = wrap.value;

    // cards fly up with stagger and slight 3D tilt on enter
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: panel,
            start: 'top 20%',
        },
    });

    tl.fromTo(
        '.person-card',
        { y: 60, opacity: 0, rotationX: 6, transformOrigin: 'center center' },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.5,
            animationDuration: 1.2,
        }
    );
});
</script>
