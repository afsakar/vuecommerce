import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useNotificationStore = defineStore('notificationStore', () => {
    const notification = ref({
        message: '',
        type: '',
        show: false
    });

    watch(
        notification,
        (value) => {
            if (value.show) {
                setTimeout(() => {
                    notification.value = {
                        message: '',
                        type: '',
                        show: false
                    };
                }, 5000);
            }
        },
        { deep: true }
    );

    return {
        notification
    };
});
