<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen transition-colors duration-300"
  >
    <div class="fixed top-4 right-4 z-50">
      <div class="relative">
        <button
          @click="toggleTheme"
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
                ? isDark
                  ? 'bg-[#ff6000] text-white'
                  : 'bg-[#ff6000] text-white'
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
                ? isDark
                  ? 'bg-[#ff6000] text-white'
                  : 'bg-[#ff6000] text-white'
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
    </div>

    <div
      class="min-h-screen transition-colors duration-300"
      :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
    >
      <header class="transition-colors duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 sm:h-20">
            <div class="flex-shrink-0">
              <a
                href="#"
                class="font-clash text-xl sm:text-2xl font-light transition-colors"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Care+
              </a>
            </div>

            <nav class="hidden md:flex items-center space-x-2">
              <a
                v-for="item in navItems"
                :key="item"
                href="#"
                class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
                :class="
                  isDark
                    ? 'bg-[#242424] text-[#CBCBCB] hover:bg-[#333333]'
                    : 'bg-white text-[#555555] hover:bg-gray-50 shadow-sm'
                "
              >
                {{ item }}
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDark = ref(true);
const showDropdown = ref(false);
const navItems = ["Overview", "Analytics", "Profile"];

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }
});

const toggleTheme = () => {
  showDropdown.value = !showDropdown.value;
};

const setTheme = (theme) => {
  isDark.value = theme === "dark";
  localStorage.setItem("theme", theme);
  showDropdown.value = false;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fixed")) {
      showDropdown.value = false;
    }
  });
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@300;400;500;600;700&display=swap");

.font-clash {
  font-family: "Clash Display", sans-serif;
}
</style>
