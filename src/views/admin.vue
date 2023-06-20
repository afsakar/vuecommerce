<script setup>
import { useHead } from '@vueuse/head';
import { onMounted, ref, h } from 'vue';
import { RouterLink } from 'vue-router';
import isGuest from '@/middleware/isGuest.js';
import { IconHome, IconListDetails } from '@tabler/icons-vue';
import { darkTheme, NConfigProvider, trTR, dateTrTR, NIcon } from 'naive-ui';

import router from '@/router';

useHead({
    htmlAttrs: {
        class: 'relative',
        'data-theme': 'bootstrapDark'
    }
});

const theme = ref(null);
const locale = ref(trTR);

onMounted(() => {
    isGuest();
    theme.value = darkTheme;
    theme.value.common.primaryColor = '#0D6EFDFF';
    theme.value.common.primaryColorHover = '#2080F0FF';
});

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}
</script>

<template>
    <n-config-provider :locale="locale" :theme="theme" :date-locale="dateTrTR">
        <div class="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <!-- Navbar -->
                <div class="w-full navbar bg-base-300">
                    <div class="flex-none lg:hidden">
                        <label for="my-drawer-3" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div class="flex-1 px-2 mx-2"></div>
                    <div class="flex-none hidden lg:block">
                        <ul class="menu menu-horizontal space-x-2">
                            <!-- Navbar menu content here -->
                            <li><router-link class="font-semibold focus:bg-primary focus:text-white/80" :active-class="$route.name === 'dashboard' ? 'btn-primary' : ''" :to="{ name: 'dashboard' }">Dashboard</router-link></li>
                            <li><router-link class="font-semibold focus:bg-primary focus:text-white/80" :active-class="$route.name === 'products' ? 'btn-primary' : ''" :to="{ name: 'products' }">Products</router-link></li>
                            <li>
                                <details>
                                    <summary class="font-semibold focus:bg-primary focus:text-white/80">Parent item</summary>
                                    <ul class="z-50">
                                        <li><a>level 2 item 1</a></li>
                                        <li><a>level 2 item 2</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Page content here -->
                <div class="max-w-[100vw] px-6 pb-16 xl:pr-2">
                    <div class="prose prose-sm md:prose-base w-full flex-grow pt-10">
                        <router-view />
                    </div>
                </div>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-3" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 h-full bg-base-200 space-y-2">
                    <!-- Sidebar content here -->
                    <div class="min-h-[4rem]">
                        <a :href="$router.resolve({ name: 'home' }).href">
                            <img src="/images/logo.svg" height="40" alt="Brand" />
                        </a>
                    </div>
                    <li><router-link class="font-semibold focus:bg-primary focus:text-white/80" :active-class="$route.name === 'dashboard' ? 'btn-primary' : ''" :to="{ name: 'dashboard' }">Dashboard</router-link></li>
                    <li><router-link class="font-semibold focus:bg-primary focus:text-white/80" :active-class="$route.name === 'products' ? 'btn-primary' : ''" :to="{ name: 'products' }">Products</router-link></li>
                    <li>
                        <details>
                            <summary class="font-semibold focus:bg-primary focus:text-white/80">Parent item</summary>
                            <ul class="z-50">
                                <li><a>level 2 item 1</a></li>
                                <li><a>level 2 item 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    </n-config-provider>
</template>

<style scoped></style>