import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backend = new URL(env.VITE_API_BASE_URL?.trim() || 'https://helloproperties-backend.vercel.app/api')

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: backend.origin,
          changeOrigin: true,
          rewrite: (path) => `${backend.pathname.replace(/\/+$/, '')}${path.slice(4)}`,
          configure: (proxy) => {
            // This is a server-to-server request to the configured backend.
            proxy.on('proxyReq', (request) => request.removeHeader('origin'))
          },
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Core React ecosystem
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              // Map libraries
              if (id.includes('leaflet') || id.includes('react-leaflet')) {
                return 'vendor-map';
              }
              // Animation libraries
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              // All other node_modules
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
