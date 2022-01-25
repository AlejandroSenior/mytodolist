import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

// Modules
import user from "@/modules/user";
import tasks from "@/modules/tasks";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user", "tasks"],
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    tasks,
  },
  plugins: [vuexLocal.plugin],
});
