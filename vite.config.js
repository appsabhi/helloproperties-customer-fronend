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
  }
})
