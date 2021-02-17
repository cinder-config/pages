import redirectSSL from 'redirect-ssl'

export default {
  head: {
    title: 'Classifier',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    extractApiUrl: process.env.EXTRACT_API_URL || 'http://localhost:8080',
    predictApiUrl: process.env.PREDICT_API_URL || 'http://localhost:8081'
  },
  ssr: false,
  modules: ['bootstrap-vue/nuxt'],
  buildModules: [
    '@nuxtjs/fontawesome',
  ],
  components: true,
  fontawesome: {
    icons: {
      solid: ['faSpinner', 'faCheck', 'faTimes', 'faCogs', 'faShare', 'faInfoCircle', 'faThumbsUp'],
    }
  },
  plugins: [],
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
    }),
  ]
}
