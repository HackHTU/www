<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    title: string;
    content: string;
}>();

let isOpen = ref(false);
</script>
<template>
    <div
        class="border-secondary m-1 flex flex-col gap-3 rounded-3xl border-2 p-5 shadow-lg"
        @click="isOpen = !isOpen">
        <div class="flex w-full cursor-pointer items-center justify-between select-none">
            <span class="text-xl font-semibold">{{ title }}</span>
            <div class="size-6">
                <svg
                    v-if="!isOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 32">
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.7"
                        d="M12 4H4m0 0v8m0-8 9.3 9.3M20 28h8m0 0v-8m0 8-9.3-9.3" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.7"
                        d="M26.7 18.7h-8m0 0v8m0-8L28 28M5.3 13.3h8m0 0v-8m0 8L4 4" />
                </svg>
            </div>
        </div>

        <div v-if="isOpen" class="mt-2 flex max-w-full flex-col items-start gap-3">
            <hr class="border-primary my-2 w-full" />

            <p class="text-lg whitespace-pre-line">{{ content }}</p>
        </div>
    </div>
</template>
