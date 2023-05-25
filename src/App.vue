<script setup>
import { useHead } from '@vueuse/head';
import { ref } from 'vue';

useHead({
    templateParams: {
        site: {
            name: 'Vuecommerce',
            url: 'https://example.com'
        },
        separator: '-'
    },
    titleTemplate: '%s %separator %site.name',
    meta: [
        {
            name: 'description',
            content: 'Vue 3 + Vite + TailwindCSS'
        }
    ],
    link: [
        {
            rel: 'stylesheet',
            href: '/fonts/fontawesome/css/all.min.css'
        },
        {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/iconfont/tabler-icons.min.css'
        }
    ],
    script: [
        {
            src: 'https://cdn.jsdelivr.net/npm/@tabler/icons@1.74.0/icons-react/dist/index.umd.min.js'
        }
    ],
    htmlAttrs: {
        class: 'transition ease-in-out'
    },
    bodyAttrs: {
        class: 'relative'
    }
});

const loading = ref(true);

setTimeout(() => {
    loading.value = false;
}, 1000);
</script>

<template>
    <div v-if="loading" class="grid h-screen place-items-center">
        <span class="loader">Vuecommerce</span>
    </div>
    <router-view v-else />
</template>

<style scoped>
.loader {
    font-size: 48px;
    display: inline-block;
    letter-spacing: 2px;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    box-sizing: border-box;
    animation: animloader 1s ease-in infinite alternate;
}

@keyframes animloader {
    0% {
        filter: blur(0px);
        transform: skew(0deg);
    }
    100% {
        filter: blur(3px);
        transform: skew(-4deg);
    }
}
</style>
