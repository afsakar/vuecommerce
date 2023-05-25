import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import UnheadVite from '@unhead/addons/vite';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        Pages({
            dirs: 'src/views',
            exclude: ['**/components/*.vue']
        }),
        UnheadVite()
    ]
});
