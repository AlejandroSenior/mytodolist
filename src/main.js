import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Populate users and tasks
import { tasks, categories } from "./data/taskSeed";
import userSeed from "./data/userSeed";
if (localStorage.getItem("allTasks") === null) localStorage.setItem("allTasks", JSON.stringify(tasks));
if (localStorage.getItem("allCategories") === null) localStorage.setItem("allCategories", JSON.stringify(categories));
if (localStorage.getItem("allUsers") === null) localStorage.setItem("allUsers", JSON.stringify(userSeed.users));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
