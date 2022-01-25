import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      layout: "LoginLayout"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  const userId = store.getters["user/getUserId"];

  // Check that the user is not logged in and redirect to login page
  if (!userId && to.path !== "/login") {
    return next({ path: "/login" });
  }

  // Check that the user is logged in and block /login page
  if (userId && to.path === "/login") {
    return next({ path: "/" });
  }

  next();
});

export default router;
