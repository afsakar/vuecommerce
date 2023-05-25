import { useAuthStore } from '@/composables/authStore.js';
import { useRouter } from 'vue-router';

export default async function isGuest() {
    const userStore = useAuthStore();
    const router = useRouter();
    userStore.loadingSession = true;
    const user = await userStore.checkSession();
    if (!user) {
        router.push({ name: 'login' });
    }
    userStore.loadingSession = false;
}
