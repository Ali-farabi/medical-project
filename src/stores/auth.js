import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://medical-backend-54hp.onrender.com/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
    userName: (state) => state.user?.name || "Guest",
  },

  actions: {
    initAuth() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          this.token = token;
          this.user = JSON.parse(user);
          this.isAuthenticated = true;

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Error parsing user data:", error);
          this.logout();
        }
      }
    },

    async register(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          `${API_URL}/auth/register`,
          credentials
        );

        if (response.data.success) {
          const { user, token } = response.data.data;

          this.user = user;
          this.token = token;
          this.isAuthenticated = true;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return { success: true };
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Ошибка регистрации";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);

        if (response.data.success) {
          const { user, token } = response.data.data;

          this.user = user;
          this.token = token;
          this.isAuthenticated = true;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return { success: true };
        }
      } catch (error) {
        this.error = error.response?.data?.message || "Ошибка входа";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];
    },

    async fetchCurrentUser() {
      if (!this.token) return;

      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.data.success) {
          this.user = response.data.data;
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        if (error.response?.status === 401) {
          this.logout();
        }
      }
    },

    async updateProfile(profileData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.put(`${API_URL}/auth/me`, profileData, {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        if (response.data.success) {
          this.user = response.data.data;
          localStorage.setItem("user", JSON.stringify(response.data.data));
          return { success: true };
        }
      } catch (error) {
        this.error =
          error.response?.data?.message || "Ошибка обновления профиля";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
  },
});
