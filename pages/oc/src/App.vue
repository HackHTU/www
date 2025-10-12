<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Nav from '@/components/Nav.vue';

import MediaGrid from '@/components/MediaGrid.vue';

// import MMD from '@/components/MMD.vue';
// MMD model and animation URLs
// import modelUrl from '@/assets/mmd/LUNA/model.pmd?raw';
// const modelUrl = '/mmd/LUNA/model.pmx';
// const vmdUrls = ['/mmd/vmds/wavefile_v2.vmd'];
// const audioUrl = '/mmd/audios/wavefile_short.mp3';

// const initialPosition = {
//     x: 20,
//     y: window.innerHeight - 420,
// };

import * as medias from './medias';

import poster from '@/assets/luna/poster.png';
</script>

<template>
    <!-- 背景渐变效果 -->
    <div
        class="from-background via-background to-primary/10 fixed inset-0 -z-10 bg-gradient-to-br"></div>

    <Nav title="Luna" />

    <header class="relative flex w-full items-center justify-center px-5 pt-24 pb-12">
        <div class="group relative flex w-full items-center justify-center">
            <img
                :src="poster"
                alt="Luna Poster"
                class="border-primary/40 shadow-primary/20 group-hover:border-primary/60 group-hover:shadow-primary/30 m-10 max-w-3/5 rounded-4xl border-8 object-contain shadow-2xl transition-all duration-500 group-hover:scale-102" />
            <!-- 装饰性光晕 -->
            <div
                class="from-primary/40 to-secondary/40 absolute inset-0 -z-10 rounded-4xl bg-gradient-to-br opacity-30 blur-3xl"></div>
        </div>
    </header>

    <div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <MediaGrid
            v-for="(item, index) in medias"
            :key="index"
            :media="item"
            class="mb-8 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300" />
    </div>

    <div class="mx-auto max-w-4xl px-4 pb-20">
        <div
            class="border-primary/30 from-background to-primary/5 hover:shadow-primary/20 relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br p-12 shadow-2xl backdrop-blur-sm transition-all duration-300">
            <div class="relative z-10">
                <div class="text-primary mb-6 text-4xl font-bold tracking-wide">感谢创作者</div>
                <p class="text-primary/80 mb-8 text-lg leading-relaxed">
                    作品的左下角是这些二创作者，有这些二创的作者是我们的荣幸，也同时欢迎将你的文学或美术等二创作品提交至此。
                </p>

                <div class="mb-8 w-full">
                    <div
                        class="bg-primary/5 mb-6 w-full overflow-hidden rounded-2xl p-4"
                        role="list"
                        aria-label="创作者滚动">
                        <div
                            class="animate-ticker flex w-max items-center gap-12"
                            aria-hidden="false">
                            <div
                                class="text-primary flex gap-12 px-4 text-4xl font-bold whitespace-nowrap italic">
                                <span class="transition-all duration-300 hover:scale-125">INI</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://tally.so/r/mJ5M5K"
                        target="_blank"
                        class="border-primary text-primary hover:bg-primary hover:text-background bg-background hover:shadow-primary/20 inline-flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <span>提交你的二创</span>
                        <svg
                            class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <Footer />

    <!-- <MMD
        :model-url="modelUrl"
        :vmd-urls="vmdUrls"
        :audio-url="audioUrl"
        title="MMD Widget"
        :width="200"
        :height="400"
        :initial-position="initialPosition" />  -->
</template>

<style scoped>
.animate-ticker {
    animation: ticker-scroll 20s linear infinite;
}

@keyframes ticker-scroll {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

.animate-fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 添加全局平滑滚动 */
:deep(*) {
    scroll-behavior: smooth;
}
</style>
