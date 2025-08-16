<script setup lang="ts">
import Gallery from '@/components/Gallery.vue';

//@ts-expect-error contents
const contents = [];
</script>

<template>
    <Gallery
        :gallery-items="contents"
        title="Labs"
        description="我们一直在探索创新，这些是我们的最近进展。" />
</template>
