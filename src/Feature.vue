<template>
    <div
        ref="container"
        class="bg-secondary text-primary m-2 mx-auto my-10 flex max-w-5/6 flex-col flex-wrap items-center gap-12 rounded-3xl p-12 leading-relaxed">
        <span class="text-2xl font-bold lg:text-5xl">我们的新功能</span>

        <div
            class="text-primary flex flex-wrap content-center items-center justify-center gap-3 text-xl font-medium lg:text-3xl">
            <template v-for="(item, index) in items" :key="index">
                <span
                    class="keyword translate-y-4 cursor-pointer px-2 whitespace-nowrap opacity-0"
                    :style="{ color: item.color, opacity: 0.7 }">
                    {{ item.text }}
                </span>
                <span
                    v-if="index < items.length - 1"
                    class="separator translate-y-4 px-2 text-gray-400 opacity-0">
                    /
                </span>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
    items: Array<{
        text: string;
        color: string;
    }>;
}>();

function shuffleArray<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const items = shuffleArray([...props.items.filter(item => item.text.length > 0)]);
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
    if (container.value) {
        const elements = container.value.querySelectorAll('.keyword, .separator');

        // 初始滚动淡入
        gsap.fromTo(
            elements,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container.value,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Hover 弹簧效果
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(el, {
                    scale: 1.15,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.4)', // 弹簧感
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });
    }
});
</script>
