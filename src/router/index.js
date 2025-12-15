import { createRouter, createWebHistory } from "vue-router";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/homepage.vue";
import Profile from "../pages/profile.vue";
import admin from "../pages/ AdminDashboard.vue";
import BookingPage from "../pages/BookingPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
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
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin",
    name: "Admin",
    component: admin,
    meta: {
      requiresAuth: true,
      role: "admin",
    },
  },
  {
    path: "/booking/:id",
    name: "Booking",
    component: BookingPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
