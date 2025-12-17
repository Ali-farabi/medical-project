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
                : 'text-gray-300 hover:bg-[#333333]'
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
            <span class="font-clash text-sm">Light</span>
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
            <span class="font-clash text-sm">Dark</span>
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

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
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
                <span class="font-clash text-sm font-medium text-[#ff6000]">
                  Online booking 24/7
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
                @click="scrollToBooking"
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

          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] rounded-3xl blur-3xl opacity-20 animate-pulse"
            ></div>
            <div
              class="relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-300"
            >
              <img
                src="../assets/doctor.png"
                alt="Doctor"
                class="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div class="mt-24" id="doctors-section">
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          >
            <h2
              class="font-clash text-3xl font-semibold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Наши врачи
            </h2>

            <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Искать врача..."
                class="px-4 py-3 border font-clash text-sm outline-none rounded-xl w-full sm:w-64"
                :class="
                  isDark
                    ? 'bg-[#242424] border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-200 text-[#111111] placeholder-gray-400 shadow-sm'
                "
              />

              <select
                v-model="selectedSpecialty"
                class="px-4 py-3 rounded-xl border font-clash outline-none w-full sm:w-64"
                :class="
                  isDark
                    ? 'bg-[#242424] border-gray-700 text-white'
                    : 'bg-white border-gray-200 text-[#111111] shadow-sm'
                "
              >
                <option value="">Все специальности</option>
                <option
                  v-for="spec in specialties"
                  :key="spec.id"
                  :value="spec.id"
                >
                  {{ spec.name }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="loading" class="flex items-center justify-center py-20">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6000]"
            ></div>
          </div>

          <div
            v-else-if="filteredDoctors.length === 0"
            class="text-center py-20"
          >
            <p
              class="font-clash text-lg"
              :class="isDark ? 'text-gray-400' : 'text-gray-600'"
            >
              Врачи не найдены
            </p>
          </div>

          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="doctor in filteredDoctors"
              :key="doctor.id"
              class="rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800 hover:border-gray-700'
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
              "
              @click="openDoctorDetails(doctor)"
            >
              <div class="flex items-start space-x-4 mb-4">
                <div class="flex-1">
                  <h3
                    class="font-clash text-lg font-bold mb-1"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ doctor.name }}
                  </h3>
                  <span
                    class="inline-block px-3 py-1 rounded-full text-xs font-clash font-medium bg-[#6C5BD4]/10 text-[#6C5BD4]"
                  >
                    {{ doctor.specialty_name || "N/A" }}
                  </span>
                </div>
              </div>

              <p
                class="text-sm font-clash mb-4 line-clamp-2"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                {{
                  doctor.description ||
                  "Опытный специалист с многолетним стажем работы"
                }}
              </p>

              <div class="space-y-2 mb-4">
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-4 h-4"
                    :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span
                    class="text-sm font-clash"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                  >
                    Опыт: {{ doctor.experience_years || 0 }} лет
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-4 h-4 text-[#ff6000]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span
                    class="text-sm font-clash font-medium"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ doctor.rating || 0 }} ({{ doctor.reviews_count || 0 }}
                    отзывов)
                  </span>
                </div>
              </div>

              <div
                class="flex items-center justify-between pt-4 border-t"
                :class="isDark ? 'border-gray-700' : 'border-gray-200'"
              >
                <div>
                  <p
                    class="text-xs font-clash mb-1"
                    :class="isDark ? 'text-gray-500' : 'text-gray-500'"
                  >
                    Консультация от
                  </p>
                  <p class="text-xl font-clash font-bold text-[#ff6000]">
                    {{ doctor.consultation_price || 0 }} ₸
                  </p>
                </div>
                <button
                  class="px-4 py-2 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash text-sm font-medium hover:shadow-lg transition-all"
                  @click.stop="bookAppointment(doctor)"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(true);
const isDark = ref(true);
const showDropdown = ref(false);
const searchQuery = ref("");
const selectedSpecialty = ref("");
const doctors = ref([]);
const specialties = ref([]);
const userRole = ref("user"); // Default role

const API_URL = "https://medical-backend-54hp.onrender.com/api";

// Computed property for navigation items based on user role
const navItems = computed(() => {
  const baseItems = [{ name: "Overview", path: "/home" }];

  if (userRole.value === "admin") {
    baseItems.push({ name: "Admin Page", path: "/admin" });
  } else {
    baseItems.push({ name: "Analytics", path: "/analytics" });
  }

  baseItems.push({ name: "Profile", path: "/profile" });

  return baseItems;
});

const stats = [
  { value: "500+", label: "Врачей" },
  { value: "50+", label: "Специализаций" },
  { value: "24/7", label: "Поддержка" },
];

const filteredDoctors = computed(() => {
  let result = doctors.value;

  if (searchQuery.value) {
    result = result.filter(
      (doctor) =>
        doctor.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        doctor.specialty_name
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedSpecialty.value) {
    result = result.filter(
      (doctor) => doctor.specialty_id === selectedSpecialty.value
    );
  }

  return result;
});

const fetchDoctors = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${API_URL}/doctors`);
    if (!res.ok) throw new Error("Failed to fetch doctors");
    doctors.value = await res.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
  } finally {
    loading.value = false;
  }
};

const fetchSpecialties = async () => {
  try {
    const res = await fetch(`${API_URL}/specialties`);
    if (!res.ok) throw new Error("Failed to fetch specialties");
    specialties.value = await res.json();
  } catch (error) {
    console.error("Error fetching specialties:", error);
  }
};

// Function to get user role from localStorage or API
const getUserRole = () => {
  // Try to get from localStorage first
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      userRole.value = userData.role || "user";
      return;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  // Alternative: get from token or API call
  const token = localStorage.getItem("token");
  if (token) {
    // You can decode JWT token here or make an API call to get user info
    // For now, setting default to "user"
    userRole.value = "user";
  }
};

const navigateTo = (path) => {
  router.push(path);
};

const scrollToBooking = () => {
  const doctorsSection = document.getElementById("doctors-section");
  if (doctorsSection) {
    doctorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const openDoctorDetails = (doctor) => {
  router.push(`/booking/${doctor.id}`);
};

const bookAppointment = (doctor) => {
  router.push(`/booking/${doctor.id}`);
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

  // Get user role on mount
  getUserRole();

  fetchDoctors();
  fetchSpecialties();

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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
