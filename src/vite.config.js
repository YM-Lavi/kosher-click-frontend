import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    // השורה הבאה פותרת את השגיאה שראינו ב-Console
    'React': 'react' 
  }
})
