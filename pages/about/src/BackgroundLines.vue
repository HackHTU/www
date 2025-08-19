<template>
    <div></div>
    <svg
        ref="svg"
        class="bg-lines pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2000 500">
        <defs>
            <linearGradient id="g" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="red" stop-opacity="0.6" />
                <stop offset="100%" stop-color="black" stop-opacity="0.02" />
            </linearGradient>
        </defs>
        <g stroke="url(#g)" stroke-width="1" fill="none" class="bg-line-layer">
            <path class="bg-line" d="M0 10 L2000 10" stroke-linecap="round" />
            <path class="bg-line" d="M0 120 L2000 120" stroke-linecap="round" />
            <path class="bg-line" d="M0 240 L2000 240" stroke-linecap="round" />
            <path class="bg-line" d="M0 360 L2000 360" stroke-linecap="round" />
            <path class="bg-line" d="M0 480 L2000 480" stroke-linecap="round" />
        </g>
    </svg>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const svg = useTemplateRef('svg');
let anim: gsap.core.Tween | null = null;

onMounted(() => {
    const scroller: Element | Document =
        document.querySelector('.scroller') || document.documentElement;
    const panels = document.querySelector('.panels') as HTMLElement | null;
    const total = panels && panels.scrollWidth ? panels.scrollWidth : 2000;

    const lines = svg.value
        ? Array.from(svg.value.querySelectorAll<SVGPathElement>('.bg-line'))
        : [];

    // subtle horizontal parallax + skew to create depth
    if (lines.length) {
        anim = gsap.to(lines, {
            xPercent: -30,
            rotation: 0.01,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
                trigger: scroller,
                start: 'top top',
                end: () => `+=${total}`,
                scrub: true,
            },
        });
    }

    // an extra subtle pulse on opacity for visual life
    if (lines.length) {
        gsap.to(lines, {
            opacity: 0.9,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: 0.4,
        });
    }
});

onBeforeUnmount(() => {
    if (anim) {
        const st = anim as unknown as { scrollTrigger?: { kill: () => void } };
        st.scrollTrigger?.kill();
        if (typeof anim.kill === 'function') anim.kill();
    }
    ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
.bg-lines {
    z-index: 0;
}
.bg-line-layer {
    transform-origin: left center;
}
.bg-line {
    stroke-width: 1.2;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    opacity: 0.8;
    transform: translateY(0);
}
</style>
