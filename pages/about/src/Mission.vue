<template>
    <section>
        <div ref="wrap" class="card flex h-1/2 gap-8">
            <h2 ref="title" class="text-split-animation mb-6 text-3xl font-bold">我们的使命</h2>
            <ul ref="list" class="flex gap-2">
                <li
                    v-for="(s, i) in slogans"
                    :key="i"
                    class="flex grow flex-col items-start justify-between gap-6 border-r border-b p-4 transition-all hover:border-r-16 hover:border-b-16">
                    <span> 0x0{{ (i + 1).toString(16) }}</span>
                    <span class="text-4xl font-black">{{ s.title }}</span>
                    <span>{{ s.desc }}</span>
                </li>
            </ul>
            <div class="shimmer"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
    slogans: {
        type: Array<{ title: string; desc: string }>,
        default: [],
    },
});

const slogans = props.slogans;
const wrap = useTemplateRef('wrap');
const title = useTemplateRef('title');

onMounted(() => {
    const wrapEl = wrap.value as HTMLElement | null;
    const titleEl = title.value as HTMLElement | null;
    if (!wrapEl || !titleEl) return;

    const panel = wrapEl.closest('.panel') as HTMLElement | null;
    if (!panel) return;

    // timeline for subtle 3D skew while scrolling
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: panel,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 0.6,
        },
    });

    tl.from(titleEl, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
    tl.from(
        '.ms-title',
        { y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
    );
});
</script>
