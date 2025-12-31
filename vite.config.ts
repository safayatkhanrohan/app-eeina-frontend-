import react from '@vitejs/plugin-react';
import tailwind from 'tailwindcss';
import { defineConfig } from 'vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost',
        ws: true,
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
