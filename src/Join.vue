<script setup lang="ts">
const TELEGRAM_URL = import.meta.env.VITE_TELEGRAM_URL;
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
</script>
<template>
    <div
        class="bg-secondary/20 border-primary/10 m-2 mx-auto my-10 grid max-w-5/6 grid-cols-2 border lg:grid-cols-4">
        <div
            class="border-primary/10 col-span-2 flex h-40 flex-col items-start justify-center gap-2 border pl-5">
            <span class="text-2xl font-semibold">Join Us</span>
            <span class="text-5xl font-black">欢迎来加入我们</span>
        </div>
        <div
            class="border-primary/10 relative col-span-2 flex h-40 flex-col items-center gap-4 overflow-hidden border">
            <span class="mt-6 text-2xl">Follow Us</span>
            <div class="absolute -bottom-5 flex gap-10">
                <a
                    class="size-25 -rotate-12 transition-transform duration-100 hover:scale-150 hover:rotate-0"
                    :href="TELEGRAM_URL"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 130 130">
                        <rect width="130" height="130" fill="#2AABEE" rx="30" />
                        <path
                            fill="#FAFAFA"
                            d="M26 62a3323 3323 0 0 1 65-26l3 1 1 2v2l-8 49c-1 5-3 7-5 7-4 1-7-2-10-5L56 82c-6-5-2-7 2-11l19-18-1-1-1-1a704 704 0 0 0-36 22l-11-2c-4-2-7-3-7-5l5-4Z" /></svg
                ></a>
                <a
                    class="size-25 rotate-12 transition-transform duration-100 hover:scale-150 hover:rotate-0"
                    :href="GITHUB_URL"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 130 130">
                        <rect width="130" height="130" fill="#171717" rx="30" />
                        <path
                            fill="#FAFAFA"
                            d="m43 31 12 3 1 1h22c5-3 8-4 11-4h2l2 2c2 3 2 7 2 10v1l-1 1 1 1c2 2 3 6 4 9v2c0 14-6 21-17 24h-1v17a4 4 0 0 1-3 4H56a4 4 0 0 1-4-3v-3c-6 0-10-2-14-7l-2-3-2-2a4 4 0 0 1 2-7l5 4 2 3c3 4 5 5 9 4v-7c-11-2-17-9-17-22v-2c0-4 1-7 3-11l1-1V35l1-1v-1l2-2h1Z" /></svg
                ></a>
            </div>
        </div>
        <a
            id="join-us-banner"
            :href="TELEGRAM_URL"
            class="contents"
            target="_blank"
            rel="noopener noreferrer">
            <div
                class=" border-primary/10 h-60 border hover:bg-green-100 bg-size-[80%] bg-bottom bg-no-repeat pt-6 pl-3 md:h-100">
                <span class="text-2xl font-bold">开发者</span>
            </div>
            <div
                class=" border-primary/10 h-60 border hover:bg-blue-100 bg-size-[100%] bg-position-[center_bottom_-4em] bg-no-repeat pt-6 pl-3 md:h-100">
                <span class="text-2xl font-bold">设计师</span>
            </div>
            <div
                class=" border-primary/10 h-60 border hover:bg-red-100 bg-size-[80%] bg-bottom bg-no-repeat pt-6 pl-3 md:h-100">
                <span class="text-2xl font-bold">插画师</span>
            </div>
            <div
                class=" border-primary/10 h-60 border hover:bg-purple-100 bg-size-[80%] bg-bottom bg-no-repeat pt-6 pl-3 md:h-100">
                <span class="text-2xl font-bold">还有你...</span>
            </div>
        </a>
    </div>
</template>

<style scoped>
#join-us-banner div:nth-child(1) {
    background-image: url('./assets/person/developer.png');
}
#join-us-banner div:nth-child(2) {
    background-image: url('./assets/person/designer.png');
}
#join-us-banner div:nth-child(3) {
    background-image: url('./assets/person/illustrator.png');
}
#join-us-banner div:nth-child(4) {
    background-image: url('./assets/person/you.png');
}
</style>
