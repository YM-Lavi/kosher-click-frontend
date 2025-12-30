import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // זה יבטיח ש-React יהיה זמין גלובלית אם משהו מתפספס
    'global': {},
  },
})
