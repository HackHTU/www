<template>
    <section>
        <div class="card relative flex max-w-1/2 gap-8 rounded-2xl">
            <img
                class="h-full w-auto rounded-3xl object-contain"
                src="./assets/image.png"
                alt="thanks" />
        </div>

        <div
            class="absolute bottom-2 animate-pulse rounded-3xl bg-neutral-600 px-2 py-1 text-xs text-neutral-400">
            继续滚动预览全文 &rightarrow;
        </div>

        <a
            href="/"
            class="group absolute left-3 flex h-full items-center justify-center gap-8 px-10 text-5xl font-extralight text-neutral-50 transition-all duration-700 [writing-mode:vertical-lr] hover:font-black">
            <span>Back</span>
            <hr
                class="max-h-10 grow rounded-sm border transition-all duration-700 group-hover:max-h-full" />
            <span>Home</span>
        </a>
    </section>
</template>
