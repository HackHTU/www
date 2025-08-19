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
    <Nav title="Luna" />

    <header class="relative flex w-full items-center justify-center px-5 pt-20">
        <img
            :src="poster"
            alt="poster"
            class="border-primary m-10 rounded-3xl border-8 border-double object-contain lg:max-w-3/5" />
    </header>

    <MediaGrid
        v-for="(item, index) in medias"
        :key="index"
        :media="item"
        class="mx-auto max-w-3xl" />

    <div
        class="border-secondary/30 mx-auto my-10 flex max-w-[80%] flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border-2 bg-neutral-900 p-10 text-center">
        <div class="text-4xl text-neutral-200">感谢</div>
        <p class="text-neutral-300">
            作品的左下角是这些二创作者，有这些二创的作者是我们的荣幸，也同时欢迎将你的文学或美术等二创作品提交至此。
        </p>
        <div class="m-2 w-full text-neutral-100">
            <div class="w-full overflow-hidden" role="list" aria-label="创作者滚动">
                <div class="animate-ticker flex w-max items-center gap-8" aria-hidden="false">
                    <div class="flex gap-8 text-3xl whitespace-nowrap text-white italic">
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                        <span class="transition-transform hover:scale-130">INI</span> /
                    </div>
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
        :initial-position="initialPosition" /> -->
</template>

<style scoped>
.animate-ticker {
    animation: ticker-right 13s linear infinite;
}

@keyframes ticker-right {
    from {
        transform: translateX(-50vw);
    }
    to {
        transform: translateX(50vw);
    }
}
</style>
