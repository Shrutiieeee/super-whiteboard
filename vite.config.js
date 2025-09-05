import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_ZEGO_APP_ID || "/super-whiteboard",
  base:process.env.VITE_ZEGO_SERVER_URL || "/super-whiteboard", 
  build: {
    outDir: 'dist',
  }
})