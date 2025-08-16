<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Nav from '@/components/Nav.vue';

import MMD from '@/components/MMD.vue';

// MMD model and animation URLs
// import modelUrl from '@/assets/mmd/LUNA/model.pmd?raw';
const modelUrl = '/mmd/LUNA/model.pmx';
const vmdUrls = ['/mmd/vmds/wavefile_v2.vmd'];
const audioUrl = '/mmd/audios/wavefile_short.mp3';

const initialPosition = {
    x: 20,
    y: window.innerHeight - 420,
};
</script>

<template>
    <Nav title="OC/二创" />

    <header class="relative flex h-dvh w-full items-center justify-center">
        <div class="flex h-full w-full flex-col items-center justify-center gap-6"></div>
    </header>

    <main class="grid auto-rows-[20em] grid-cols-2 gap-4 p-4 xl:grid-cols-4"></main>

    <Footer />

    <MMD
        :model-url="modelUrl"
        :vmd-urls="vmdUrls"
        :audio-url="audioUrl"
        title="MMD Widget"
        :width="200"
        :height="400"
        :initial-position="initialPosition" />
</template>
