import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 };
    }
});

export default router;
