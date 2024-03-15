// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      BEARER_TOKEN: process.env.BEARER_TOKEN || 'default_token',
      SITE_ID: process.env.SITE_ID || 'default_id',
    },
  },
  components: [
    { path: '~/components/content', extensions: ['vue'] },
    { path: '~/components/header', extensions: ['vue'] },
    { path: '~/components/product', extensions: ['vue'] },
    { path: '~/components/modals', extensions: ['vue'] },
    { path: '~/components/detail', extensions: ['vue'] },
    { path: '~/components/pagination', extensions: ['vue'] },
  ],
  modules: [
    '@pinia/nuxt',
  ],
})
