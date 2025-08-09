<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import Nav from '@/components/Nav.vue';
import Collapse from '@/components/Collapse.vue';
import Lab from './Lab.vue';
import Session from './Session.vue';

import { ref } from 'vue';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

interface CollapseContent {
    title: string;
    content: string;
}

let collapses = ref<CollapseContent[]>([
    {
        title: `什么是 HackNet？`,
        content: `HackNet 是 HackHTU 的实验室、会议和课程的集合。

        它旨在为 HackHTU 的成员提供一个学习和实践的平台，帮助他们提升技能，参与项目，并与其他成员交流。

        通过 HackNet，我们希望能够培养出更多优秀的 HackHTU 建造者。`,
    },
    {
        title: `怎么参加培训？`,
        content: `我们的视频托管到 Wistia 平台，您可以直接点击视频在平台上观看和学习。

        同时，我们将所有的代码和资源开源到 GitHub 上，您可以自由下载和使用。
        `,
    },
    {
        title: `为什么我打不开？`,
        content: `我们将资源托管到国外的第三方平台，这些第三方平台都是安全的，但是可能会受到网络限制，导致无法访问。

        建议您使用 VPN 或者代理工具来访问这些资源。
        `,
    },
    {
        title: `上面的资料我可以下载吗？`,
        content: `我们的视频和资料都是开源的，您可以自由下载和使用，没有版权和付费限制。

        不过，请注意遵循相应的开源协议和版权声明。
        `,
    },
    {
        title: `我也想录制 HackNet？`,
        content: `欢迎您参与 HackNet 的录制工作！

        主题不限，内容不限，计算机相关的内容之外也是没有问题的，您可以录制任何相关的内容。

        您可以与我们联系，获取更多的录制资源和支持，我们会尽力提供帮助（例如录音，剪辑，发布）。
        `,
    },
    {
        title: `一起共同建设 HackHTU？`,
        content: `我们欢迎所有人参与到 HackHTU 的建设中来！

        无论您是想要贡献代码、提供方案，还是分享您的想法和建议，都可以与我们联系。

        我们相信，只有通过共同的努力，才能够建设一个更好的 HackHTU。
        `,
    },
]);
</script>

<template>
    <Nav title="HackNet" />

    <header class="relative flex h-dvh w-full items-center justify-center">
        <div class="flex h-full w-full flex-col items-center justify-center gap-6">
            <img src="./logo.svg" alt="HackNet" class="max-w-4/5" />
            <p class="max-w-4/5 text-center text-xl">
                HackNet 是我们为培训下一代 HackHTU 建造者而创建的实验室 Labs、会议 Sessions 和课程
                Courses。
            </p>
            <a
                :href="GITHUB_URL"
                class="border-primary bg-primary text-background m-1 mt-5 cursor-pointer rounded-xl border px-4 py-2 text-3xl select-none hover:invert">
                加入我们
            </a>
        </div>

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
            <rect width="100%" height="100%" fill="url(#bg)" />
        </svg>
    </header>

    <main>
        <Lab />
        <Session />
    </main>

    <Collapse
        v-for="value in collapses"
        :key="value.title"
        :title="value.title"
        :content="value.content"
        class="ld:max-w-3/5 mx-auto my-5 max-w-4/5" />

    <Footer />
</template>
