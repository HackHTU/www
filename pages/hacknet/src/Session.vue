<script setup lang="ts">
import Gallery from '@/components/Gallery.vue';

//@ts-expect-error contents
const contents = [];
</script>

<template>
    <Gallery
        :gallery-items="contents"
        title="Sessions & Courses"
        description="探索我们精心策划的会议，了解相关知识。" />
</template>
