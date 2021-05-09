export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'NuxtBnb | %s',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    prefetchLinks: false
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
    '~/plugins/vCalendar.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    jit: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '~/modules/auth',
    '~/modules/algolia',
    '~/modules/cloudinary',
    '@nuxtjs/cloudinary',
    '@nuxt/image'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0
    }
  },
  cloudinary: {
    cloudName: 'dfobe29zv'
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dfobe29zv/image/upload/'
    }
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId: '511830555653-oirt8e6dh123fa0slroois257v6b0pdr.apps.googleusercontent.com'
    },
    algolia: {
      appId: 'HD8L8P9R0Q',
      key: 'c29bba919f0d7d322ff5b7ed630044ae'
    },
    cloudinary: {
      apiKey: '245763438982358'
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'HD8L8P9R0Q',
      key: '7949878a382f3e1bb4f0e3d206b696c6'
    },
    cloudinary: {
      apiSecret: '00_27FqCBjHQsnVKxU5Ow_G7GK0'
    }
  }
}
