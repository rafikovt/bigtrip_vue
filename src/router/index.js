import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../pages/Main.vue";
import Stats from "../pages/Stats.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/stats",
    name: "Stats",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Stats,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
