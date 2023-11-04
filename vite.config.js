import { defineConfig } from 'vite'
require('dotenv').config()


const { PRODUCTION } = process.env
const build = process.env == "true"
export default defineConfig({
    // used for building - "base" is the name of the github repo.
    // easy guide here https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane
    base: build ? "/product_customiser/" : "",
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