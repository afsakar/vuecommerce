<script setup>
import { RouterLink } from 'vue-router';
import { onMounted, ref, h } from 'vue';
import { HomeOutline } from '@vicons/ionicons5';
import { useAdminStore } from '@/composables/adminStore';
import { IconHome, IconListDetails } from '@tabler/icons-vue';
import { NSpace, NLayout, NLayoutSider, NIcon, NMenu } from 'naive-ui';

const adminStore = useAdminStore();

onMounted(() => {
    // check window size and set collapseSidebar
    const width = window.innerWidth;
    if (width < 768) {
        adminStore.collapseSidebar = true;
    }
});

const menuOptions = [
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

function renderMenuLabel(option) {
    if ('href' in option) {
        return h('a', { href: option.href, target: '_blank' }, [option.label]);
    }
    return option.label;
}

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}
</script>

<template>
    <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <n-layout-sider collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="adminStore.collapseSidebar" show-trigger @collapse="adminStore.collapseSidebar = true" @expand="adminStore.collapseSidebar = false">
            <n-menu :collapsed="adminStore.collapseSidebar" :collapsed-width="64" :options="menuOptions" />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
            <slot />
        </n-layout>
    </n-layout>
</template>
