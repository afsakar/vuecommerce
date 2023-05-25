<script setup>
import isGuest from '@/middleware/isGuest.js';
import AccountMain from './tabs/AccountMain.vue';
import { onMounted, provide, ref, watch } from 'vue';
import PasswordChange from './tabs/PasswordChange.vue';
import AccountSettings from './tabs/AccountSettings.vue';

onMounted(async () => {
    isGuest();
});

const tabs = {
    AccountMain,
    AccountSettings,
    PasswordChange
};

const tabNames = {
    AccountMain: 'Main Page',
    AccountSettings: 'Account Settings',
    PasswordChange: 'Password'
};

const activeTab = ref('AccountMain');

function setActiveTab(tab) {
    activeTab.value = tab;
}
</script>

<template>
    <section class="bg-base-200 py-4">
        <div class="container max-w-screen-xl mx-auto px-4">
            <!-- breadcrumbs start -->
            <h2 class="text-4xl">Profile</h2>
            <ol class="inline-flex flex-wrap space-x-1 md:space-x-3 items-center">
                <li class="inline-flex items-center">
                    <a class="hover:text-primary" href="#">Home</a>
                    <i class="ml-3 text-base-content font-semibold fa fa-chevron-right"></i>
                </li>
                <li class="inline-flex items-center">Profile</li>
            </ol>
            <!-- breadcrumbs end -->
        </div>
        <!-- container .// -->
    </section>
    <section class="py-10">
        <div class="container max-w-screen-xl mx-auto px-4">
            <div class="flex flex-col md:flex-row -mx-4">
                <aside class="md:w-1/3 lg:w-1/4 px-4">
                    <ul class="menu bg-base-200 rounded-lg p-2 mb-5 space-y-1">
                        <li v-for="(tab, index) in tabs" :key="index">
                            <button @click="setActiveTab(index)" :class="{ active: activeTab === index }">{{ tabNames[index] }}</button>
                        </li>
                    </ul>
                </aside>
                <!-- col.// -->
                <main class="md:w-2/3 lg:w-3/4 px-4">
                    <article class="bg-base-200 shadow-sm rounded mb-5 p-3 lg:p-5">
                        <KeepAlive>
                            <component :is="tabs[activeTab]" />
                        </KeepAlive>
                    </article>
                    <!-- card.// -->
                </main>
            </div>
            <!-- grid.// -->
        </div>
        <!-- container.// -->
    </section>
</template>

<route lang="json">
{
    "name": "profile",
    "meta": {
        "requiresAuth": true
    }
}
</route>
