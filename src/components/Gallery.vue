<script setup lang="ts">
export interface GalleryItem {
    title: string;
    description: string;

    src: {
        image?: string;
        video?: string;
        iframe?: string;
    };
}

defineProps<{
    galleryItems: GalleryItem[];
    title: string;
    description?: string;
}>();

import { ref, onMounted } from 'vue';

const galleryRef = ref<HTMLElement>();
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const updateScrollButtons = () => {
    if (galleryRef.value) {
        const { scrollLeft, scrollWidth, clientWidth } = galleryRef.value;
        canScrollLeft.value = scrollLeft > 0;
        canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1;
    }
};

const scrollLeft = () => {
    if (galleryRef.value) {
        const scrollAmount = galleryRef.value.clientWidth * 0.8;
        galleryRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (galleryRef.value) {
        const scrollAmount = galleryRef.value.clientWidth * 0.8;
        galleryRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

onMounted(() => {
    updateScrollButtons();
    if (galleryRef.value) {
        galleryRef.value.addEventListener('scroll', updateScrollButtons);
    }
});
</script>

<template>
    <div class="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <!-- 标题和介绍 -->
        <div class="mb-8 text-center">
            <h2 class="text-primary mb-4 text-3xl font-bold sm:text-4xl">{{ title }}</h2>
            <p class="text-primary mx-auto max-w-2xl text-lg opacity-80">
                {{ description }}
            </p>
        </div>

        <!-- 画廊容器 -->
        <div class="relative">
            <!-- 左侧导航按钮 -->
            <button
                :class="[
                    'bg-background border-primary/20 hover:border-primary/40 absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all duration-200 hover:shadow-lg',
                    canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0',
                ]"
                aria-label="向左滚动"
                @click="scrollLeft">
                <svg
                    class="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <!-- 右侧导航按钮 -->
            <button
                :class="[
                    'bg-background border-primary/20 hover:border-primary/40 absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-md transition-all duration-200 hover:shadow-lg',
                    canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0',
                ]"
                aria-label="向右滚动"
                @click="scrollRight">
                <svg
                    class="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <!-- 滚动容器 -->
            <div
                ref="galleryRef"
                class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-8"
                style="scrollbar-width: none; -ms-overflow-style: none">
                <div
                    v-for="item in galleryItems"
                    :key="item.title"
                    class="w-64 flex-shrink-0 snap-start sm:w-72 md:w-80 lg:w-96">
                    <div
                        class="bg-background border-primary/10 hover:border-primary/20 h-full overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-md">
                        <div class="overflow-hidden">
                            <!-- image -->
                            <img
                                v-if="item.src.image"
                                :src="item.src.image"
                                :alt="item.title"
                                class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                            <!-- or video -->
                            <video
                                v-if="item.src.video"
                                :src="item.src.video"
                                :alt="item.title"
                                class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                controls />
                            <!-- or iframe -->
                            <iframe
                                v-if="item.src.iframe"
                                :src="item.src.iframe"
                                :title="item.title"
                                class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                frameborder="0"
                                allowfullscreen></iframe>
                        </div>
                        <div class="p-4">
                            <h3 class="text-primary mb-2 text-lg font-semibold">
                                {{ item.title }}
                            </h3>
                            <p class="text-primary text-sm opacity-70">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
