<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 transition-colors duration-300"
    :style="{
      backgroundColor: isDark ? '#111111' : '#F9FAFB',
    }"
  >
    <div class="fixed top-4 right-4 z-50">
      <button
        @click="toggleDropdown"
        class="p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm"
        :class="
          isDark
            ? 'bg-[#242424] border-gray-700 text-white hover:bg-[#333333]'
            : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 shadow-md'
        "
      >
        <svg
          v-if="!isDark"
          class="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      <div
        v-if="showDropdown"
        class="absolute top-full right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-xl transition-all duration-200"
        :class="
          isDark
            ? 'bg-[#242424] border border-gray-700'
            : 'bg-white border border-gray-200'
        "
      >
        <button
          @click="setTheme('light')"
          class="w-full px-4 py-3 flex items-center space-x-3 transition-colors"
          :class="
            !isDark
              ? 'bg-[#ff6000] text-white'
              : isDark
              ? 'text-gray-300 hover:bg-[#333333]'
              : 'text-gray-700 hover:bg-gray-50'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span class="font-clash text-sm">Светлая</span>
          <svg
            v-if="!isDark"
            class="w-4 h-4 ml-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          @click="setTheme('dark')"
          class="w-full px-4 py-3 flex items-center space-x-3 transition-colors"
          :class="
            isDark
              ? 'bg-[#ff6000] text-white'
              : isDark
              ? 'text-gray-300 hover:bg-[#333333]'
              : 'text-gray-700 hover:bg-gray-50'
          "
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <span class="font-clash text-sm">Тёмная</span>
          <svg
            v-if="isDark"
            class="w-4 h-4 ml-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <div>
      <h1
        class="font-clash text-xl sm:text-2xl font-medium p-4 sm:p-10 absolute left-0 right-0 top-0 transition-colors"
        :class="isDark ? 'text-white' : 'text-[#111111]'"
      >
        Care +
      </h1>
    </div>

    <div
      class="w-full max-w-md p-4 sm:p-8 rounded-lg shadow-lg mt-16 sm:mt-0 transition-all duration-300"
      :class="
        isDark
          ? 'bg-[#242424] border border-gray-800'
          : 'bg-white border border-gray-100'
      "
    >
      <h2
        class="text-xl sm:text-2xl font-bold text-center font-clash mb-4 sm:mb-6 transition-colors"
        :class="isDark ? 'text-white' : 'text-[#111111]'"
      >
        Login
      </h2>

      <!-- Сообщение об ошибке -->
      <div
        v-if="error"
        class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
      >
        <p class="text-red-500 text-sm font-clash text-center">{{ error }}</p>
      </div>

      <!-- Сообщение об успехе -->
      <div
        v-if="success"
        class="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
      >
        <p class="text-green-500 text-sm font-clash text-center">
          {{ success }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 text-sm sm:text-base"
          >
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@mail.com"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5BD4] transition-colors"
            :class="
              isDark
                ? 'bg-[#333333] border border-gray-700 text-white placeholder-gray-500'
                : 'bg-[#F9FAFB] border border-gray-200 text-[#111111] placeholder-gray-400'
            "
            required
            :disabled="loading"
          />
        </div>

        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 text-sm sm:text-base"
          >
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5BD4] transition-colors"
            :class="
              isDark
                ? 'bg-[#333333] border border-gray-700 text-white placeholder-gray-500'
                : 'bg-[#F9FAFB] border border-gray-200 text-[#111111] placeholder-gray-400'
            "
            required
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#6C5BD4] text-white py-2.5 sm:py-3 my-3 sm:my-5 font-clash rounded-lg hover:bg-[#5a4bc4] transition-all text-sm sm:text-base active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "Вход..." : "Login" }}
        </button>
      </form>

      <div class="mt-4 text-center">
        <p
          class="text-xs sm:text-sm transition-colors"
          :class="isDark ? 'text-gray-400' : 'text-[#555555]'"
        >
          Don't have an account?
          <router-link
            to="/register"
            class="text-[#6C5BD4] hover:underline font-clash"
          >
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(true);
const showDropdown = ref(false);
const loading = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const error = ref("");
const success = ref("");

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fixed")) {
      showDropdown.value = false;
    }
  });
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const setTheme = (theme) => {
  isDark.value = theme === "dark";
  localStorage.setItem("theme", theme);
  showDropdown.value = false;
};

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    const response = await axios.post(
      "https://medical-backend-54hp.onrender.com/api/auth/login",
      form
    );

    console.log("Login response:", response.data);

    if (
      response.data.success &&
      response.data.data &&
      response.data.data.token
    ) {
      const token = response.data.data.token;
      const user = response.data.data.user;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      console.log("Token saved:", token);
      console.log("User saved:", user);

      success.value = "Вход выполнен успешно!";

      form.email = "";
      form.password = "";

      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } else {
      error.value = "Не удалось получить токен авторизации";
    }
  } catch (err) {
    console.error("Login error:", err);
    error.value =
      err.response?.data?.message || "Ошибка входа. Проверьте данные.";
  } finally {
    loading.value = false;
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@300;400;500;600;700&display=swap");

.font-clash {
  font-family: "Clash Display", sans-serif;
}
</style>
