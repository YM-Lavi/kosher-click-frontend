import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // הגדרות אלו עוזרות למנוע את שגיאת "React is not defined" בגרסאות חדשות
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
