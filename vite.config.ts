import { URL, fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,json,ico,png,svg,jpeg,jpg,mp3,ttf,webp}',
        ],
      },
      manifest: {
        name: 'Focamu',
        short_name: 'Focamu',
        description: 'Learn Capoeira Songs easily',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/android/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android/android-launchericon-192-192.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/android/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
    VueI18nPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  test: {
    coverage: {
      all: true,
      clean: true,
      include: ['src/**.{js,ts,vue}', 'src/**/**.{js,ts,vue}'],
      exclude: ['src/main.ts', 'src/unit/*'],
    },
  },
})
