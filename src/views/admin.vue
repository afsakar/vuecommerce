<script setup>
import { onMounted, ref, h } from 'vue';
import { RouterLink } from 'vue-router';
import isGuest from '@/middleware/isGuest.js';
import { useAdminStore } from '@/composables/adminStore';
import Sidebar from '@/views/admin/components/Sidebar.vue';
import { IconHome, IconListDetails } from '@tabler/icons-vue';
import { darkTheme, NConfigProvider, trTR, NGlobalStyle, dateTrTR, NLayoutHeader, NLayout, NMenu, NIcon } from 'naive-ui';

import router from '@/router';

const adminStore = useAdminStore();

const theme = ref(null);
const locale = ref(trTR);

onMounted(() => {
    isGuest();
    theme.value = darkTheme;
});

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
    {
        label: 'Vuecommerce',
        key: 'logo',
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'dashboard'
                    }
                },
                { default: () => 'Dashboard' }
            ),
        key: 'dashboard',
        icon: renderIcon(IconHome)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'products'
                    }
                },
                { default: () => 'Products' }
            ),
        key: 'products',
        icon: renderIcon(IconHome)
    },
    {
        label: 'Dance Dance Dance',
        key: 'Dance Dance Dance',
        children: [
            {
                type: 'group',
                label: 'People',
                key: 'people',
                children: [
                    {
                        label: 'Narrator',
                        key: 'narrator'
                    },
                    {
                        label: 'Sheep Man',
                        key: 'sheep-man'
                    }
                ]
            },
            {
                label: 'The past increases. The future recedes.',
                key: 'the-past-increases-the-future-recedes'
            }
        ],
        icon: renderIcon(IconListDetails)
    }
];
</script>

<template>
    <n-config-provider :locale="locale" :theme="theme" :date-locale="dateTrTR">
        <n-global-style />
        <div class="relative min-h-screen">
            <n-layout position="absolute">
                <n-layout-header style="height: 64px; padding: 24px" bordered>
                    <n-menu :inverted="false" mode="horizontal" :collapsed="adminStore.collapseSidebar" :collapsed-width="64" :options="menuOptions" />
                </n-layout-header>
                <n-layout content-style="padding: 24px;">
                    <router-view />
                </n-layout>
            </n-layout>
        </div>
    </n-config-provider>
</template>
