import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'offline.html',
        'src/app/theme.ts',
        '@mantine/core/styles.css',
        'icons/192.png',
        'icons/512.png',
        'icons/180.png',
      ],
      manifest: {
        name: 'React Note',
        short_name: 'Note',
        start_url: '/',
        display: 'standalone',
        theme_color: '#317EFB',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'icons/20.png',
            sizes: '20x20',
            type: 'image/png',
          },
          {
            src: 'icons/29.png',
            sizes: '29x29',
            type: 'image/png',
          },
          {
            src: 'icons/32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'icons/40.png',
            sizes: '40x40',
            type: 'image/png',
          },
          {
            src: 'icons/50.png',
            sizes: '50x50',
            type: 'image/png',
          },
          {
            src: 'icons/57.png',
            sizes: '57x57',
            type: 'image/png',
          },
          {
            src: 'icons/60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: 'icons/72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: 'icons/80.png',
            sizes: '80x80',
            type: 'image/png',
          },
          {
            src: 'icons/87.png',
            sizes: '87x87',
            type: 'image/png',
          },
          {
            src: 'icons/100.png',
            sizes: '100x100',
            type: 'image/png',
          },
          {
            src: 'icons/114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: 'icons/120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: 'icons/128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/167.png',
            sizes: '167x167',
            type: 'image/png',
          },
          {
            src: 'icons/180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/1024.png',
            sizes: '1024x1024',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  publicDir: 'public',
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
