import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],

    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/VueQrcode.js',
    '~/plugins/vue-youtube-embed.js',
    '~/plugins/i18n.js',
    '~/plugins/SocialSharing.js',
    '~/plugins/jsonld',
    '~/plugins/geolocation'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-MZ3ZXQV' }],
    '@nuxtjs/device',
    'nuxt-seo',
    '@nuxtjs/sitemap'
  ],
  seo: {
    name: 'yalla dealz',
    title: 'yalla dealz',
    templateTitle: '%name% - %title%',
    description: 'best website for making dealz .'
  },
  sitemap: {
    routes: [
      async () => {
        await axios
          .get(
            process.env.baseUrl +
              '/api/deals?key=&skip=0&limit=3&rate=0&minPrice=4&maxPrice=10000&sortBy=low_to_high&categoryId=000000000000000000000000'
          )
          .then(res => {
            return res.data.deals.map(e => `/deal/${e._id}`)
          })
      },
      '/profile/0',
      '/profile/1',
      '/profile/2',
      '/profile/3',
      '/profile/4',
      '/profile/5',
      async () => {
        await axios.get(process.env.baseUrl + '/api/categories').then(res => {
          return res.data.data.map(e => `/category/${e._id}`)
        })
      }
    ]
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: ['vue-youtube-embed']
  },
  auth: {
    strategies: {
      google: {
        client_id:
          '786921048790-vjk6f2f99pnrf73lat9mbtraj171t4s6.apps.googleusercontent.com'
      },
      facebook: {
        client_id: '232332534303433',
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      }
    }
  },
  env: {
    baseUrl: process.env.baseURL || 'https://api.yalladealz.com'
  }
}
