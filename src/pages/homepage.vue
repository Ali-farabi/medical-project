<template>
  <section class="min-h-screen bg-[#111111]">
    <header class="">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <div class="flex-shrink-0">
            <router-link
              to="/"
              class="text-white font-clash text-xl sm:text-2xl font-semibold"
            >
              Care+
            </router-link>
          </div>

          <nav class="hidden md:flex items-center space-x-2">
            <router-link
              to="/overview"
              class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
              :class="
                isActive('/overview')
                  ? 'bg-[#ff6000] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              "
            >
              Overview
            </router-link>

            <router-link
              to="/analytics"
              class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
              :class="
                isActive('/analytics')
                  ? 'bg-[#ff6000] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              "
            >
              Analytics
            </router-link>

            <router-link
              to="/patients"
              class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
              :class="
                isActive('/patients')
                  ? 'bg-[#ff6000] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              "
            >
              Patients
            </router-link>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg
              v-if="!isMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-[#242424] border-t border-gray-800"
      >
        <nav class="px-4 py-4 space-y-2">
          <router-link
            to="/overview"
            @click="closeMenu"
            class="block px-6 py-3 rounded-full font-clash text-sm font-medium transition-all duration-200"
            :class="
              isActive('/overview')
                ? 'bg-[#ff6000] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            "
          >
            Overview
          </router-link>

          <router-link
            to="/analytics"
            @click="closeMenu"
            class="block px-6 py-3 rounded-full font-clash text-sm font-medium transition-all duration-200"
            :class="
              isActive('/analytics')
                ? 'bg-[#ff6000] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            "
          >
            Analytics
          </router-link>

          <router-link
            to="/patients"
            @click="closeMenu"
            class="block px-6 py-3 rounded-full font-clash text-sm font-medium transition-all duration-200"
            :class="
              isActive('/patients')
                ? 'bg-[#ff6000] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            "
          >
            Patients
          </router-link>
        </nav>
      </div>
    </header>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const isActive = (path) => {
  return route.path === path;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>
