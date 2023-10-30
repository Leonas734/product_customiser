import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './html/product-customiser/index.html',
      },
    },
  },
  server: {
    open: './html/product-customiser/index.html',
},
})