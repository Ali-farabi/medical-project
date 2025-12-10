import { createRouter, createWebHistory } from "vue-router";
import Register from "../pages/Register.vue";
import Login from "../auth/Login.vue";
import Home from "../pages/homepage.vue";
const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "/home", name: "Home", component: Home },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
