import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['assets/images/icons/favicon.ico', 'assets/images/icons/apple-touch-icon.png', 'assets/images/icons/mask-icon.svg'],
      manifest: {
        name: 'Restaurante Pizzería',
        short_name: 'Proy4',
        description: 'Desarrollo Web Full Stack 2023',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
})
