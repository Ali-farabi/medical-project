<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
    :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
  >
    <div class="text-center">
      <div class="mb-8">
        <h1
          class="text-9xl font-clash font-bold mb-4"
          :class="isDark ? 'text-white' : 'text-[#111111]'"
        >
          404
        </h1>
        <div class="flex items-center justify-center space-x-2 mb-4">
          <div
            class="w-3 h-3 rounded-full bg-[#ff6000] animate-bounce"
            style="animation-delay: 0s"
          ></div>
          <div
            class="w-3 h-3 rounded-full bg-[#ff6000] animate-bounce"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-3 h-3 rounded-full bg-[#ff6000] animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
        </div>
        <p
          class="text-2xl font-clash font-semibold mb-2"
          :class="isDark ? 'text-white' : 'text-[#111111]'"
        >
          Страница не найдена
        </p>
        <p
          class="text-lg font-clash mb-8"
          :class="isDark ? 'text-gray-400' : 'text-gray-600'"
        >
          Кажется, вы заблудились в медицинском центре
        </p>
      </div>

      <button
        @click="goHome"
        class="px-8 py-4 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-2xl font-clash font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <span class="flex items-center justify-center">
          Вернуться на главную
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(true);

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }
});

const goHome = () => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/home");
  } else {
    router.push("/login");
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@300;400;500;600;700&display=swap");

.font-clash {
  font-family: "Clash Display", sans-serif;
}
</style>
