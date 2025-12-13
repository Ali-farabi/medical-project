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
    </div>

    <div
      class="min-h-screen transition-colors duration-300"
      :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
    >
      <header class="transition-colors duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 sm:h-20">
            <div class="flex-shrink-0">
              <router-link
                to="/home"
                class="font-clash text-xl sm:text-2xl font-medium transition-colors"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Care+
              </router-link>
            </div>

            <nav class="hidden md:flex items-center space-x-2">
              <button
                v-for="item in navItems"
                :key="item.name"
                @click="navigateTo(item.path)"
                class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
                :class="
                  isDark
                    ? 'bg-[#242424] text-[#CBCBCB] hover:bg-[#333333]'
                    : 'bg-white text-[#555555] hover:bg-gray-50 shadow-sm'
                "
              >
                {{ item.name }}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="space-y-4">
              <div
                class="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300"
                :class="
                  isDark
                    ? 'bg-[#ff6000]/10 border border-[#ff6000]/20'
                    : 'bg-[#ff6000]/5 border border-[#ff6000]/10'
                "
              >
                <span
                  class="w-2 h-2 rounded-full bg-[#ff6000] mr-2 animate-pulse"
                ></span>
                <span
                  class="font-clash text-sm font-medium"
                  :class="isDark ? 'text-[#ff6000]' : 'text-[#ff6000]'"
                >
                  Онлайн бронирование 24/7
                </span>
              </div>

              <h1
                class="font-clash text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight transition-colors"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Запись к врачу за
                <span
                  class="bg-gradient-to-r from-[#ff6000] to-[#ff8c42] bg-clip-text text-transparent"
                >
                  2 минуты
                </span>
              </h1>

              <p
                class="text-lg sm:text-xl leading-relaxed transition-colors"
                :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
              >
                Выберите специалиста, удобное время и получите подтверждение
                мгновенно. Без очередей и звонков в регистратуру.
              </p>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="scrollToBooking"
                class="group px-8 py-4 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-2xl font-clash font-medium text-lg shadow-lg shadow-[#ff6000]/25 hover:shadow-xl hover:shadow-[#ff6000]/40 transition-all duration-300 hover:scale-105"
              >
                <span class="flex items-center justify-center">
                  Записаться на приём
                  <svg
                    class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              <button
                class="px-8 py-4 rounded-2xl font-clash font-medium text-lg transition-all duration-300 border-2"
                :class="
                  isDark
                    ? 'bg-[#242424] border-gray-700 text-white hover:bg-[#333333]'
                    : 'bg-white border-gray-200 text-[#111111] hover:bg-gray-50 shadow-md'
                "
              >
                Посмотреть врачей
              </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8">
              <div v-for="stat in stats" :key="stat.label" class="space-y-1">
                <div
                  class="font-clash text-3xl font-bold transition-colors"
                  :class="isDark ? 'text-white' : 'text-[#111111]'"
                >
                  {{ stat.value }}
                </div>
                <div
                  class="text-sm transition-colors"
                  :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                >
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content - Doctor Card -->
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] rounded-3xl blur-3xl opacity-20 animate-pulse"
            ></div>
            <div
              class="relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424]/80 border-gray-700/50'
                  : 'bg-white/80 border-gray-200 shadow-2xl'
              "
            >
              <div class="space-y-6"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(true);
const showDropdown = ref(false);

const navItems = [
  { name: "Overview", path: "/home" },
  { name: "Analytics", path: "/analytics" },
  { name: "Profile", path: "/profile" },
];

const stats = [
  { value: "500+", label: "Врачей" },
  { value: "50+", label: "Специализаций" },
  { value: "24/7", label: "Поддержка" },
];

const navigateTo = (path) => {
  router.push(path);
};

const scrollToBooking = () => {
  console.log("Scrolling to booking section");
};

const toggleTheme = () => {
  showDropdown.value = !showDropdown.value;
};

const setTheme = (theme) => {
  isDark.value = theme === "dark";
  localStorage.setItem("theme", theme);
  showDropdown.value = false;
};

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
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@300;400;500;600;700&display=swap");

.font-clash {
  font-family: "Clash Display", sans-serif;
}
</style>
