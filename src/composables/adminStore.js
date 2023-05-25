import { ref } from 'firebase/storage';
import { defineStore } from 'pinia';
import { onMounted } from 'vue';

export const useAdminStore = defineStore('adminStore', () => {
    const collapseSidebar = ref(false);

    const toggleSidebar = () => {
        collapseSidebar.value = !collapseSidebar.value;
    };

    return {
        collapseSidebar,
        toggleSidebar
    };
});
