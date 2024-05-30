// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/google-fonts", "nuxt-icon"],
  googleFonts: {
    families: {
      "Nanum Gothic": true,
      "Teachers": true
    }
  },
  runtimeConfig: {
    public: {
      API_ENDPOINT: "http://192.168.1.69:8000/api",
      WS_IP: "192.168.1.69",
      WS_PORT: 6969
    }
  }
})