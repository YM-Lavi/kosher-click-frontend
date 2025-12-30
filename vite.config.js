import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // השורה הזו פותרת את השגיאה "React is not defined"
    jsxInject: `import React from 'react'`
  }
})
