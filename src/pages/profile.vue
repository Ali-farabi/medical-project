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
          <svg
            v-else
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
        </button>

        <div
          v-if="showDropdown"
          class="absolute top-full right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-xl"
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
            <span class="text-sm font-medium">Светлая</span>
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
            <span class="text-sm font-medium">Тёмная</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="min-h-screen transition-colors duration-300"
      :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
    >
      <!-- Header -->
      <header>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <router-link
              to="/home"
              class="text-2xl font-clash font-bold transition-colors"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Care+
            </router-link>
            <button
              @click="logout"
              class="px-6 py-2.5 rounded-full text-sm font-clash font-medium transition-all"
              :class="
                isDark
                  ? 'bg-[#242424] text-[#CBCBCB] hover:bg-[#333333]'
                  : 'bg-white text-[#555555] hover:bg-gray-50 shadow-sm'
              "
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Sidebar -->
          <div class="lg:col-span-4">
            <div
              class="rounded-3xl p-8 transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              "
            >
              <!-- Avatar -->
              <div class="flex flex-col items-center space-y-4">
                <div class="relative">
                  <div
                    class="w-32 h-32 rounded-full bg-gradient-to-r from-[#ff6000] to-[#ff8c42] p-1"
                  >
                    <div
                      class="w-full h-full rounded-full flex items-center justify-center text-4xl font-clash font-bold"
                      :class="
                        isDark
                          ? 'bg-[#242424] text-white'
                          : 'bg-white text-[#111111]'
                      "
                    >
                      {{ userData.name.charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <button
                    class="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>

                <div class="text-center space-y-2">
                  <h2
                    class="text-2xl font-clash font-bold"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ userData.name }}
                  </h2>
                  <p
                    class="text-sm"
                    :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                  >
                    {{ userData.email }}
                  </p>
                  <div
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-clash font-medium"
                    :class="
                      isDark
                        ? 'bg-[#ff6000]/10 text-[#ff6000]'
                        : 'bg-[#ff6000]/5 text-[#ff6000]'
                    "
                  >
                    {{ userData.role === "user" ? "Пациент" : userData.role }}
                  </div>
                </div>
              </div>

              <div class="mt-8 space-y-4">
                <div
                  class="p-4 rounded-xl"
                  :class="isDark ? 'bg-[#333333]' : 'bg-gray-50'"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="text-sm font-clash"
                      :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                    >
                      Всего записей
                    </span>
                    <span
                      class="text-2xl font-clash font-bold"
                      :class="isDark ? 'text-white' : 'text-[#111111]'"
                    >
                      {{ appointments.length }}
                    </span>
                  </div>
                </div>
                <div
                  class="p-4 rounded-xl"
                  :class="isDark ? 'bg-[#333333]' : 'bg-gray-50'"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="text-sm font-clash"
                      :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                    >
                      На платформе с
                    </span>
                    <span
                      class="text-sm font-clash font-medium"
                      :class="isDark ? 'text-white' : 'text-[#111111]'"
                    >
                      {{ formatDate(userData.created_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-8 space-y-2">
                <button
                  v-for="item in navItems"
                  :key="item.id"
                  @click="activeTab = item.id"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-clash font-medium transition-all"
                  :class="
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white shadow-lg'
                      : isDark
                      ? 'text-[#CBCBCB] hover:bg-[#333333]'
                      : 'text-[#555555] hover:bg-gray-50'
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
                      :d="item.icon"
                    />
                  </svg>
                  <span>{{ item.label }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-8">
            <div
              v-if="activeTab === 'profile'"
              class="rounded-3xl p-8 transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              "
            >
              <h3
                class="text-2xl font-clash font-bold mb-6"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Личные данные
              </h3>
              <div class="space-y-6">
                <div>
                  <label
                    class="block text-sm font-clash font-medium mb-2"
                    :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                  >
                    Имя
                  </label>
                  <input
                    v-model="userData.name"
                    type="text"
                    class="w-full px-4 py-3 rounded-xl border font-clash transition-all outline-none"
                    :class="
                      isDark
                        ? 'bg-[#333333] border-gray-700 text-white focus:border-[#ff6000]'
                        : 'bg-gray-50 border-gray-200 text-[#111111] focus:border-[#ff6000]'
                    "
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-clash font-medium mb-2"
                    :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                  >
                    Email
                  </label>
                  <input
                    v-model="userData.email"
                    type="email"
                    class="w-full px-4 py-3 rounded-xl border font-clash transition-all outline-none"
                    :class="
                      isDark
                        ? 'bg-[#333333] border-gray-700 text-white focus:border-[#ff6000]'
                        : 'bg-gray-50 border-gray-200 text-[#111111] focus:border-[#ff6000]'
                    "
                  />
                </div>
                <button
                  @click="saveProfile"
                  class="px-8 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Сохранить изменения
                </button>
              </div>
            </div>

            <div
              v-if="activeTab === 'appointments'"
              class="rounded-3xl p-8 transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              "
            >
              <div class="flex items-center justify-between mb-6">
                <h3
                  class="text-2xl font-clash font-bold"
                  :class="isDark ? 'text-white' : 'text-[#111111]'"
                >
                  Мои записи
                </h3>
                <button
                  @click="goToBooking"
                  class="px-6 py-2.5 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Новая запись
                </button>
              </div>

              <div v-if="appointments.length === 0" class="text-center py-16">
                <div
                  class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#ff6000]/10 to-[#ff8c42]/10 flex items-center justify-center"
                >
                  <svg
                    class="w-12 h-12 text-[#ff6000]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4
                  class="text-xl font-clash font-bold mb-2"
                  :class="isDark ? 'text-white' : 'text-[#111111]'"
                >
                  У вас пока нет записей
                </h4>
                <p
                  class="mb-6 font-clash"
                  :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                >
                  Запишитесь на приём к специалисту
                </p>
                <button
                  @click="goToBooking"
                  class="px-8 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Записаться сейчас
                </button>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="(appointment, index) in appointments"
                  :key="index"
                  class="p-6 rounded-xl border transition-all"
                  :class="
                    isDark
                      ? 'bg-[#333333] border-gray-700 hover:border-[#ff6000]'
                      : 'bg-gray-50 border-gray-200 hover:border-[#ff6000]'
                  "
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <h4
                        class="font-clash font-bold text-lg"
                        :class="isDark ? 'text-white' : 'text-[#111111]'"
                      >
                        {{ appointment.doctorName }}
                      </h4>
                      <p
                        class="text-sm font-clash"
                        :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                      >
                        {{ appointment.specialty }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p
                        class="font-clash font-medium"
                        :class="isDark ? 'text-white' : 'text-[#111111]'"
                      >
                        {{ appointment.date }}
                      </p>
                      <p
                        class="text-sm font-clash"
                        :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                      >
                        {{ appointment.time }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="activeTab === 'settings'"
              class="rounded-3xl p-8 transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              "
            >
              <h3
                class="text-2xl font-clash font-bold mb-6"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Настройки
              </h3>
              <div class="space-y-6">
                <div
                  class="p-4 rounded-xl border"
                  :class="
                    isDark
                      ? 'bg-[#333333] border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  "
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <h4
                        class="font-clash font-medium"
                        :class="isDark ? 'text-white' : 'text-[#111111]'"
                      >
                        Уведомления
                      </h4>
                      <p
                        class="text-sm font-clash"
                        :class="isDark ? 'text-[#CBCBCB]' : 'text-[#555555]'"
                      >
                        Получать напоминания о записях
                      </p>
                    </div>
                    <button
                      @click="notifications = !notifications"
                      class="w-12 h-6 rounded-full relative transition-all"
                      :class="
                        notifications
                          ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42]'
                          : isDark
                          ? 'bg-gray-700'
                          : 'bg-gray-300'
                      "
                    >
                      <div
                        class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                        :class="
                          notifications ? 'translate-x-6 left-1' : 'left-1'
                        "
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
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
const activeTab = ref("profile");
const notifications = ref(true);

const userData = ref({
  id: 5,
  email: "aliba@gmail.com",
  name: "aliba",
  role: "user",
  avatar: null,
  created_at: "2025-12-13T07:10:30.018Z",
  updated_at: "2025-12-13T07:10:30.018Z",
});

const appointments = ref([]);

const navItems = [
  {
    id: "profile",
    label: "Профиль",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "appointments",
    label: "Мои записи",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: "settings",
    label: "Настройки",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    userData.value = JSON.parse(savedUser);
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fixed")) {
      showDropdown.value = false;
    }
  });
});

const toggleTheme = () => {
  showDropdown.value = !showDropdown.value;
};

const setTheme = (theme) => {
  isDark.value = theme === "dark";
  localStorage.setItem("theme", theme);
  showDropdown.value = false;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

const goToBooking = () => {
  router.push("/home");
};

const saveProfile = () => {
  localStorage.setItem("user", JSON.stringify(userData.value));
  console.log("Profile saved:", userData.value);
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@300;400;500;600;700&display=swap");

.font-clash {
  font-family: "Clash Display", sans-serif;
}
</style>
