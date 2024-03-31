import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
  }
},
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }

});