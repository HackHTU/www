<script setup lang="ts">
import Nav from '@/components/Nav.vue';

import Header from './Header.vue';
import Join from './Join.vue';
import Feature from './Feature.vue';

import Footer from '@/components/Footer.vue';
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
    const url = new URL(window.location.href);
    if (!['localhost', '127.0.0.1', 'htu.me'].includes(url.hostname)) {
        alert('我们的网站已经改为 htu.me 了，将会为您自动跳转...');
        window.location.href = 'https://htu.me';
    }
});

const keywords: Array<{ text: string; color: string }> = [
    { text: '全新 UI 设计', color: '#FF5733' },
    { text: '可安装软件程序', color: '#3498DB' },
    { text: 'Github 组织', color: '#2ECC71' },
    { text: '开源驱动', color: '#F39C12' },
    { text: '开放设计稿', color: '#9B59B6' },
    { text: 'Telegram 群组', color: '#3498DB' },
    { text: 'Discord 群组', color: '#E74C3C' },
    { text: 'LUNA 二创', color: '#C1C40F' },
    { text: '关于与致谢', color: '#34495E' },
    { text: 'HackNet', color: '#95A5A6' },
    { text: '全新域名 htu.me', color: '#3498DB' },
];
</script>
<template>
    <Nav />

    <Header />

    <Feature :items="keywords" />

    <Join />

    <Footer />
</template>
