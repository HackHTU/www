<script lang="ts" setup>
import { ref } from 'vue';
defineProps<{
    src: string;
    alt?: string;
}>();

const isShowPreview = ref(false);
</script>
<template>
    <div class="relative h-full w-full">
        <video :src="src" class="h-full w-full object-cover" @click="isShowPreview = true"></video>

        <Teleport to="body">
            <div
                v-if="isShowPreview"
                class="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-neutral-600"
                @click.self="isShowPreview = false">
                <div class="relative max-h-full max-w-full text-white">
                    <video
                        :src="src"
                        :alt="alt"
                        controls
                        autoplay
                        class="max-h-full max-w-full object-contain"></video>
                    <a class="absolute top-4 left-4 cursor-pointer" :href="src" download> 下载 </a>
                    <button
                        class="absolute top-4 right-4 cursor-pointer"
                        @click="isShowPreview = false">
                        关闭
                    </button>
                    <p class="absolute bottom-4 left-4">{{ alt }}</p>
                </div>
            </div>
        </Teleport>
    </div>
</template>
