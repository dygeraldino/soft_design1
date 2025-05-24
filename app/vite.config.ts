import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Atajo para imports limpios
      },
    },
    define: {
      // Inyectar claves en tiempo de build de forma segura
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __API_KEY__: JSON.stringify(env.VITE_API_KEY),
    },
    server: {
      port: 5173, // o el que necesites
      strictPort: true, // falla si el puerto está ocupado
    },
    build: {
      sourcemap: false, // Evita exponer el código en producción
      outDir: 'dist',
    },
  }
})
