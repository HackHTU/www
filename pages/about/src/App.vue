<script lang="ts">
const people = [
    {
        name: 'Niapya',
        role: 'Cofounder',
        img: '/src/assets/person/developer.png',
        desc: '孵化了 HackHTU 的神人',
    },
    {
        name: 'INI',
        role: '插画大师',
        img: '/src/assets/person/designer.png',
        desc: '创造了炒鸡可爱的 LUNA',
    },
];

const slogans = [
    { title: 'Open', desc: '开放不是一蹴而就的，而是不断努力的。' },
    { title: 'Community', desc: '我们建立社区的桥梁，而社区造就我们。' },
    { title: 'Sustainability', desc: '可持续发展才能使我们走得更远。' },
];
</script>
<template>
    <div class="about-root relative min-h-screen w-full text-neutral-700 select-none">
        <!-- <BackgroundLines /> -->

        <main class="scroller relative h-screen w-full overflow-hidden">
            <div ref="panels" class="panels flex h-full tracking-tighter">
                <Hero />

                <Team :people="people" />

                <Mission :slogans="slogans" />

                <Features />

                <Vision />

                <Join />
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// import BackgroundLines from './BackgroundLines.vue';
import Hero from './Hero.vue';
import Team from './Team.vue';
import Mission from './Mission.vue';
import Vision from './Vision.vue';
import Join from './Join.vue';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const panels = useTemplateRef('panels');

// horizontal scroll
onMounted(() => {
    const panelEl = panels.value;
    if (!panelEl) return;

    const totalScrollWidth = panelEl.scrollWidth;
    const viewportWidth = window.innerWidth;
    const travel = totalScrollWidth - viewportWidth;

    // main horizontal tween
    gsap.to(panelEl, {
        x: () => -travel,
        ease: 'none',
        scrollTrigger: {
            trigger: panelEl.parentElement, // .scroller
            start: 'top top',
            end: () => `+=${totalScrollWidth}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
        },
    });

    // // background lines subtle parallax
    // bgAnim = gsap.to('.bg-line', {
    //     yPercent: -40,
    //     opacity: 0.85,
    //     stagger: 0.08,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: panelEl.parentElement,
    //         start: 'top top',
    //         end: () => `+=${totalScrollWidth}`,
    //         scrub: true,
    //     },
    // });
});

// .text-split-animation
onMounted(async () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

    document.querySelectorAll('.text-split-animation').forEach(el => {
        const targetText = el.textContent;
        let iterations = 0;

        gsap.to(
            {},
            {
                scrollTrigger: { trigger: el, start: 'top 80%' },
                duration: 0.01,
                repeat: targetText.replace(/\s/g, '').length,
                onRepeat: () => {
                    let current = '';
                    let nonSpaceIndex = 0;

                    for (let char of targetText) {
                        if (/\s/.test(char)) {
                            current += char;
                        } else if (nonSpaceIndex < iterations) {
                            current += char;
                            nonSpaceIndex++;
                        } else {
                            current += letters[Math.floor(Math.random() * letters.length)];
                            nonSpaceIndex++;
                        }
                    }

                    el.textContent = current;
                    iterations++;
                },
                onComplete: () => {
                    el.textContent = targetText;
                },
            }
        );
    });
});

// .card

onMounted(() => {
    const cardsNodeList = document.querySelectorAll('.card');

    const cards = Array.from(cardsNodeList);
    // remove the first card
    cards.shift();

    cards.forEach(card => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 50%',
                end: 'bottom 30%',
                scrub: 0.6,
            },
        });

        const isTop = Math.random() > 0.5;
        const fromY = isTop ? -800 : 800;
        const fromX = -200;
        const fromRX = isTop ? -6 : 6;

        // 进场飞入
        tl.fromTo(
            card,
            {
                x: fromX,
                y: fromY,
                opacity: 0,
                rotateX: fromRX,
                transformPerspective: 1200,
                transformOrigin: 'center',
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.9,
                ease: 'power3.out',
                immediateRender: false,
                onComplete: () => {
                    // 轻微弹跳
                    gsap.to(card, { scale: 1.12, duration: 0.5, ease: 'sine.inOut' });
                    gsap.to(card, { scale: 1, duration: 0.5, ease: 'sine.inOut', delay: 0.35 });
                },
            }
        );

        // gsap.to(card, {
        //     scale: 1.1,
        //     ease: 'none',
        //     scrollTrigger: {
        //         trigger: card,
        //         start: 'top bottom',
        //         end: 'bottom top',
        //         scrub: true,
        //     },
        // });

        card.addEventListener('pointermove', e => {
            const X = (e as PointerEvent).clientX;
            const Y = (e as PointerEvent).clientY;

            const rect = (card as HTMLElement).getBoundingClientRect();
            const px = (X - (rect.left + rect.width / 2)) / rect.width;
            const py = (Y - (rect.top + rect.height / 2)) / rect.height;
            gsap.to(card, {
                rotationY: px * 30,
                rotationX: -py * 30,
                duration: 0.6,
                ease: 'power2.out',
            });
        });
        card.addEventListener('pointerleave', () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
        });
    });
});
</script>

<style lang="css">
@reference "../../../src/style.css";
section {
    @apply relative flex h-full w-screen flex-none items-center justify-center;
}
.card {
    @apply min-h-2/5 min-w-2/5 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-100 p-10 shadow-xs shadow-neutral-300 transition-transform duration-300 ease-in-out backdrop:blur-lg;
}

.card h2 {
    @apply [writing-mode:vertical-lr];
}
</style>
