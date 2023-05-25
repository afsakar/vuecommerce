<script setup>
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div v-if="y > 600" class="fixed bottom-4 right-4 z-50">
        <button @click="scrollToTop" class="btn btn-secondary btn-circle shadow-lg">
            <i class="fas fa-arrow-up"></i>
        </button>
    </div>
</template>
