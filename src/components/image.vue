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
        <img
            :src="src"
            :alt="alt"
            class="h-full w-full object-cover"
            @click="isShowPreview = true" />
        <Teleport to="body">
            <div
                v-if="isShowPreview"
                class="bg-background/90 fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center backdrop-blur-sm"
                @click.self="isShowPreview = false">
                <div
                    class="relative flex items-center justify-center text-white"
                    style="width: 60vw; height: 60vh">
                    <img :src="src" :alt="alt" class="max-h-full max-w-full object-contain" />
                    <a
                        class="bg-primary/80 hover:bg-primary absolute top-4 left-4 cursor-pointer rounded-lg px-4 py-2 font-medium text-white shadow-lg backdrop-blur transition-all hover:shadow-xl"
                        :href="src"
                        download>
                        下载
                    </a>
                    <button
                        class="absolute top-4 right-4 cursor-pointer rounded-lg bg-red-500/80 px-4 py-2 font-medium text-white shadow-lg backdrop-blur transition-all hover:bg-red-600 hover:shadow-xl"
                        @click="isShowPreview = false">
                        关闭
                    </button>
                    <p
                        class="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-sm backdrop-blur">
                        {{ alt }}
                    </p>
                </div>
            </div>
        </Teleport>
    </div>
</template>
