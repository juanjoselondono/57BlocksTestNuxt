export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css', 
    '~/assets/main.css'
  ],
  script: [
    {
      src: 'bootstrap/dist/js/bootstrap.bundle.min.js'
    }
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})