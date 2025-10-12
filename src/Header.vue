<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, reactive, useTemplateRef } from 'vue';

import screenshot1 from './assets/screenshots/shot1.png';
import screenshot2 from './assets/screenshots/shot2.png';
import screenshot3 from './assets/screenshots/shot3.png';
import screenshot4 from './assets/screenshots/shot4.png';
import screenshot5 from './assets/screenshots/shot5.png';

// Must be 5 screenshots to match the original design
let screenshots = reactive(
    [
        { src: screenshot1, alt: 'Screenshot 1' },
        { src: screenshot2, alt: 'Screenshot 2' },
        { src: screenshot3, alt: 'Screenshot 3' },
        { src: screenshot4, alt: 'Screenshot 4' },
        { src: screenshot5, alt: 'Screenshot 5' },
    ].sort(() => Math.random() - 0.5)
);

let headerText = useTemplateRef('header-text');

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    const phone = window.matchMedia('(max-width: 640px)').matches;
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#screenshots',
            start: 'top bottom',
            end: 'top 70%',
            scrub: 0.9,
            once: true,
        },
    });

    timeline.from('img.ipad-frame:nth-child(3)', {
        y: phone ? '-100dvh' : '-60dvh',
        width: '80dvw',
        height: 'auto',
    });

    timeline.eventCallback('onComplete', () => {
        gsap.to(headerText.value, {
            y: 200,
            width: 'auto',
            height: 'auto',
            duration: 0.5,
            ease: 'power3.out',
        });

        // Set initial rotation for each iPad screenshot
        const ipads = document.querySelectorAll('#screenshots .ipad-frame');
        document.querySelector('#screenshots')?.classList.add('overflow-hidden');

        ipads.forEach((ipad, index) => {
            const initialRotation = index * 72; // 0, 72, 144, 216, 288deg

            gsap.set(ipad, { rotation: initialRotation });

            gsap.to(ipad, {
                rotation: initialRotation + 360,
                duration: 20,
                ease: 'none',
                repeat: -1,
                delay: 0.1,
            });
        });
    });
});
</script>
<template>
    <header class="relative flex h-dvh w-full items-start text-center">
        <div class="mx-10 flex w-full items-center justify-center gap-20 xl:flex-nowrap">
            <div
                ref="header-text"
                class="mt-30 flex flex-col gap-2 font-serif font-bold select-none">
                <h1 class="text-primary text-4xl lg:text-7xl/20">
                    Building <br />
                    <span class="text-theme text-shadow-lg">The Best Place</span><br />
                    For
                    <span class="bg-primary text-background px-2">HTUers</span>, Together
                </h1>
                <div>
                    <span class="text-lg lg:text-2xl"
                        >HackHTU 是为
                        <span class="bg-primary text-background px-2">河南师范大学学生</span>
                        打造的工具站，现已开源登场。</span
                    >
                </div>
            </div>
        </div>

        <!-- Direction -->
        <div
            class="bg-background border-secondary absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse rounded-xl border p-2 shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 30 30">
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="m20 15-5 5m0 0-5-5m5 5V10M2.5 15a12.5 12.5 0 1 0 25 0 12.5 12.5 0 0 0-25 0Z" />
            </svg>
        </div>

        <!-- Animation Background -->
        <svg
            class="text-secondary absolute -z-50 h-full w-full will-change-transform"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="bg" patternUnits="userSpaceOnUse" width="100" height="100">
                    <path
                        fill="currentColor"
                        d="M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                    <animateTransform
                        attributeName="patternTransform"
                        type="translate"
                        from="100 0"
                        to="0 100"
                        dur="30s"
                        repeatCount="indefinite" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url('#bg')" />
        </svg>
    </header>

    <div
        id="screenshots"
        class="relative flex h-dvh w-full items-center justify-center will-change-transform select-none">
        <!-- screenshots -->

        <img
            v-for="screenshot in screenshots"
            :key="screenshot.src"
            class="ipad-frame border-secondary/60 absolute bottom-1/5 aspect-video h-120 overflow-hidden rounded-3xl border-20 shadow-lg"
            :src="screenshot.src"
            :alt="screenshot.alt" />

        <div class="absolute bottom-10 z-10 flex flex-col items-center justify-center gap-4">
            <a
                class="border-secondary decoration-theme bg-primary text-background hover: m-1 cursor-pointer rounded-xl border-4 px-4 py-3 text-3xl underline decoration-wavy underline-offset-8 select-none">
                在线体验
            </a>
        </div>

        <!-- Background -->
        <img
            class="absolute top-18 right-7 size-20 md:top-20 md:right-50 md:size-40"
            src="./assets/bg/vector1.png" />
        <img
            class="absolute bottom-10 left-4 size-20 md:right-20 md:bottom-20 md:size-40"
            src="./assets/bg/vector2.png" />
        <img
            class="absolute top-12 left-12 size-20 md:right-20 md:bottom-20 md:size-40"
            src="./assets/bg/vector3.png" />

        <div class="bg-theme absolute -z-20 aspect-square h-2/3 rounded-t-[20vw] blur-[10em]"></div>
    </div>
</template>

<style lang="css" scoped>
.ipad-frame {
    transform-origin: 50% 250%;
}
</style>
