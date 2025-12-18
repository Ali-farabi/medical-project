import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { createPinia, setActivePinia } from "pinia";

import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/homepage.vue";
import Profile from "../pages/profile.vue";
import AdminDashboard from "../pages/AdminDashboard.vue";
import BookingPage from "../pages/BookingPage.vue";

const pinia = createPinia();
setActivePinia(pinia);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/booking/:id",
    component: BookingPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && localStorage.getItem("token")) {
    authStore.initAuth();
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next("/home");
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== "admin") {
    return next("/home");
  }

  next();
});

export default router;
export { pinia };
