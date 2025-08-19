<template>
    <section>
        <div
            class="card grid grid-cols-[repeat(4,minmax(15em,1fr))] grid-rows-[repeat(3,minmax(10em,1fr))] gap-0">
            <div
                class="col-span-2 flex h-full w-full flex-col items-start justify-center gap-2 place-self-start border border-neutral-400 p-4">
                <span class="text-xl">Our Vision</span>
                <span class="text-4xl font-black"
                    >我们始终认为
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-theme inline-block size-6 drop-shadow-xs drop-shadow-neutral-900"
                        fill="none"
                        viewBox="0 0 80 80">
                        <path
                            fill="currentColor"
                            d="M27 9a4 4 0 0 0-7 3v56c0 4 5 6 7 3l14-16a6 6 0 0 1 5-3h22c4 0 5-4 3-7L27 9Z" />
                    </svg>
                </span>
            </div>
            <div
                class="col-span-2 flex h-full w-full items-center justify-center border border-neutral-400 p-4 text-sm">
                We Believe That &rightarrow;
            </div>

            <div
                class="relative col-span-2 flex h-full w-full flex-col items-center justify-center gap-2 overflow-clip border border-neutral-400 p-4">
                <span class="absolute -bottom-2 text-4xl font-black">💻 Code</span>
                <span class="text-5xl font-black">🔨 Design</span>
                <span class="absolute -top-2 text-4xl font-black">✊ Make</span>
            </div>
            <div
                class="col-span-2 flex h-full w-full items-center justify-start border border-neutral-400 p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-30"
                    fill="none"
                    viewBox="0 0 150 100">
                    <path
                        fill="#05DF72"
                        d="M125 0c14 0 25 11 25 25v50a25 25 0 0 1-50 1v-1a25 25 0 0 1-50 1v-1a25 25 0 0 1-50 0V25a25 25 0 0 1 50 0v-1a25 25 0 0 1 50 1v-1c0-13 11-24 25-24Z" />
                </svg>
            </div>

            <div
                class="col-span-1 flex h-full w-full items-center justify-end border border-neutral-400 p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-30"
                    fill="none"
                    viewBox="0 0 102 105">
                    <path
                        fill="#FFA2A2"
                        fill-rule="evenodd"
                        d="M74 52v1l18 8 6 3 4 3v2l-1 1h-5l-7-1-18-4h-2v2l10 17 3 5 1 5v1h-2l-4-3-5-4-13-14h-1l-1 1-2 19-1 6-2 4-1 1h-1l-2-4-1-7-2-19-1-1h-1L29 89l-5 4-3 2h-2v-1l1-4 2-6 11-17v-1l-1-1-19 4-7 1H1l-1-1v-2l4-3 5-3 18-7 1-2-1-1-17-7-6-3-4-3v-2l1-1h5l6 1 19 4 2-1v-1L23 22l-3-6-1-5v-1h2l4 2 5 5 13 14h1l1-1 2-19 1-6 2-4 1-1 1 1 2 4 1 7 2 19h2l14-15 4-4 4-2h1l1 1-1 4-2 6-11 17v1l1 1 20-4 7-1h4l1 1v1l-4 3-5 4-16 6-3 2Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div
                class="col-span-3 flex h-full w-full items-center justify-start border border-neutral-400 p-4">
                <span
                    class="text-shadow-theme text-6xl font-semibold text-shadow-[6px_6px_0px_var(--color-theme)]"
                    >Can Change The World</span
                >
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup></script>
