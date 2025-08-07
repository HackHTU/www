import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Tailwind CSS configuration
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss()],
    // add @ alias for src directory
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    // Support for multiple entry points
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                hacknet: resolve(__dirname, 'pages/hacknet/index.html'),
                oc: resolve(__dirname, 'pages/oc/index.html'),
                about: resolve(__dirname, 'pages/about/index.html'),
                pp: resolve(__dirname, 'pages/resource/pp.html'),
                tos: resolve(__dirname, 'pages/resource/tos.html'),
            },
        },
    },
});
