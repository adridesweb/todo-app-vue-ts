import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TodoApp from "../views/TodoApp.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "TodoApp",
    component: TodoApp,
  },
  {
    path: "/:filter",
    component: TodoApp,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  linkActiveClass: "selected router-link-active",
  routes,
});

export default router;
