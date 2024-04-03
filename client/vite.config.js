import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': 'http://localhost:5174',
      
  }
},
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }

});