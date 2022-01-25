import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  theme: {
    dark: localStorage.getItem("theme") === "dark",
    themes: {
      light: {
        secondary: "#f5f5f5",
      },
      dark: {
        primary: "#E94C89",
      },
    },
  },
});
