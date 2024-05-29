// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Nanum Gothic": true,
      "Teachers": true
    }
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: "http://localhost:8000/api"
    }
  }
})