<script setup>
import { useNotificationStore } from '@/composables/notificationStore.js';

const notificationStore = useNotificationStore();
</script>

<template>
    <teleport to="body">
        <transition name="slide-fade">
            <div v-if="notificationStore.notification.show" class="toast toast-top toast-end mt-14">
                <div class="rounded-md p-3 alert" :class="{ 'alert-success': notificationStore.notification.type === 'success', 'alert-error': notificationStore.notification.type === 'error' }">
                    <div class="flex items-center justify-center gap-2">
                        <span>{{ notificationStore.notification.message }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
