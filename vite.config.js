import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Anime Calendar - Programação Sazonal',
        short_name: 'Anime Calendar',
        description: 'Descubra os animes da temporada e quando eles são lançados',
        theme_color: '#667eea',
        background_color: '#1a1a2e',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        categories: ['entertainment', 'lifestyle'],
        shortcuts: [
          {
            name: 'Ver temporada atual',
            short_name: 'Temporada',
            description: 'Abrir animes da temporada atual',
            url: '/anime-calendar/',
            icons: [
              {
                src: 'icon.svg',
                sizes: '192x192'
              }
            ]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.jikan\.moe\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'jikan-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.myanimelist\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mal-images-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  base: '/anime-calendar/',
})
