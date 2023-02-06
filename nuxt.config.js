export default defineNuxtConfig({
  app: {
    head: {
      title: '57BlocksTest',
      meta: [
        { name: 'description', content: 'This is the technical interview problem for @57blocks' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
      ],
    }
  },
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