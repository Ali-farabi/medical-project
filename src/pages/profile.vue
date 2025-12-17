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
            <span class="text-sm font-medium">Светлая</span>
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
            <span class="text-sm font-medium">Тёмная</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="min-h-screen transition-colors duration-300"
      :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
    >
      <header>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <router-link
              to="/home"
              class="font-clash text-xl sm:text-2xl font-medium transition-colors"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Care+
            </router-link>
            <button
              @click="logout"
              class="px-6 py-2.5 rounded-full font-clash text-sm font-medium transition-all duration-200"
              :class="
                isDark
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              "
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div
            class="w-16 h-16 border-4 border-[#ff6000] border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p
            class="font-clash"
            :class="isDark ? 'text-white' : 'text-[#111111]'"
          >
            Загрузка...
          </p>
        </div>
      </div>

      <div v-if="corsError" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          class="max-w-2xl mx-auto p-6 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <h3 class="text-lg font-clash font-bold text-red-500 mb-2">
            Ошибка подключения к серверу
          </h3>
          <p class="text-sm font-clash text-red-400 mb-4">
            {{ corsError }}
          </p>
          <button
            @click="retryFetch"
            class="px-6 py-2.5 bg-red-500 text-white rounded-xl font-clash font-medium hover:bg-red-600 transition-all"
          >
            Повторить попытку
          </button>
        </div>
      </div>

      <main
        v-else-if="!loading"
        class="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div class="grid lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4">
            <div
              class="rounded-3xl p-8 transition-all duration-300 border"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-700'
                  : 'bg-white border-gray-200 shadow-lg'
              "
            >
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
                      {{
                        userData.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "?"
                      }}
                    </div>
                  </div>
                </div>

                <div class="text-center space-y-2">
                  <h2
                    class="text-2xl font-clash font-bold"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ userData.name || "Пользователь" }}
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
                        ? 'bg-[#6C5BD4]/10 text-[#6C5BD4]'
                        : 'bg-[#6C5BD4]/5 text-[#6C5BD4]'
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
                    v-model="editedUser.name"
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
                    v-model="editedUser.email"
                    type="email"
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
                    Телефон
                  </label>
                  <input
                    v-model="editedUser.phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
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
                    Адрес
                  </label>
                  <textarea
                    v-model="editedUser.address"
                    rows="3"
                    placeholder="Введите ваш адрес"
                    class="w-full px-4 py-3 rounded-xl border font-clash transition-all outline-none resize-none"
                    :class="
                      isDark
                        ? 'bg-[#333333] border-gray-700 text-white focus:border-[#ff6000]'
                        : 'bg-gray-50 border-gray-200 text-[#111111] focus:border-[#ff6000]'
                    "
                  ></textarea>
                </div>
                <div
                  v-if="saveMessage"
                  class="p-4 rounded-xl"
                  :class="
                    saveSuccess
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  "
                >
                  <p class="font-clash text-sm">{{ saveMessage }}</p>
                </div>
                <button
                  @click="saveProfile"
                  :disabled="saving"
                  class="px-8 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ saving ? "Сохранение..." : "Сохранить изменения" }}
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

              <!-- Loading -->
              <div
                v-if="loadingAppointments"
                class="flex items-center justify-center py-16"
              >
                <div
                  class="w-12 h-12 border-4 border-[#ff6000] border-t-transparent rounded-full animate-spin"
                ></div>
              </div>

              <!-- Empty State -->
              <div
                v-else-if="appointments.length === 0"
                class="text-center py-16"
              >
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

              <!-- Appointments List -->
              <div v-else class="space-y-4">
                <div
                  v-for="appointment in appointments"
                  :key="appointment.id"
                  class="rounded-2xl p-6 border transition-all duration-300"
                  :class="
                    isDark
                      ? 'bg-[#333333] border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  "
                >
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <h4
                        class="text-lg font-clash font-bold mb-2"
                        :class="isDark ? 'text-white' : 'text-[#111111]'"
                      >
                        {{ appointment.doctor_name || "Врач" }}
                      </h4>
                      <span
                        class="inline-block px-3 py-1 rounded-full text-xs font-clash font-medium bg-[#6C5BD4]/10 text-[#6C5BD4]"
                      >
                        {{ appointment.specialty_name || "Специальность" }}
                      </span>
                    </div>
                    <div
                      class="px-3 py-1 rounded-full text-xs font-clash font-medium"
                      :class="getStatusClass(appointment.status)"
                    >
                      {{ getStatusText(appointment.status) }}
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div class="flex items-center space-x-3">
                      <svg
                        class="w-5 h-5 flex-shrink-0"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
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
                      <span
                        class="font-clash text-sm"
                        :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                      >
                        {{
                          formatAppointmentDate(appointment.appointment_date)
                        }}
                      </span>
                    </div>

                    <div class="flex items-center space-x-3">
                      <svg
                        class="w-5 h-5 flex-shrink-0"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span
                        class="font-clash text-sm"
                        :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                      >
                        {{ formatTime(appointment.appointment_time) }}
                      </span>
                    </div>

                    <div
                      v-if="appointment.complaints"
                      class="pt-3 border-t"
                      :class="isDark ? 'border-gray-600' : 'border-gray-300'"
                    >
                      <p
                        class="text-xs font-clash mb-1"
                        :class="isDark ? 'text-gray-500' : 'text-gray-500'"
                      >
                        Жалобы:
                      </p>
                      <p
                        class="text-sm font-clash"
                        :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                      >
                        {{ appointment.complaints }}
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="appointment.status === 'pending'"
                    class="mt-4 pt-4 border-t flex space-x-3"
                    :class="isDark ? 'border-gray-600' : 'border-gray-300'"
                  >
                    <button
                      @click="cancelAppointment(appointment.id)"
                      class="flex-1 px-4 py-2 rounded-xl font-clash text-sm font-medium transition-all"
                      :class="
                        isDark
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      "
                    >
                      Отменить запись
                    </button>
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
const loading = ref(true);
const saving = ref(false);
const saveMessage = ref("");
const saveSuccess = ref(false);
const corsError = ref("");

const API_URL = import.meta.env.VITE_API_URL;

const userData = ref({
  id: null,
  email: "",
  name: "",
  role: "user",
  phone: "",
  date_of_birth: "",
  address: "",
  avatar: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const editedUser = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const appointments = ref([]);
const loadingAppointments = ref(false);

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

const fetchUserData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found, redirecting to login");
    router.push("/");
    return;
  }

  console.log("Fetching user data with token:", token);
  console.log("API URL:", `${API_URL}/auth/me`);

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (response.ok) {
      const result = await response.json();
      console.log("User data received:", result);

      const user = result.data;

      userData.value = user;
      editedUser.value = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      };
      localStorage.setItem("user", JSON.stringify(user));
      corsError.value = "";
    } else if (response.status === 401) {
      console.error("Unauthorized - token expired or invalid");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      corsError.value = errorData.message || "Ошибка загрузки данных";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    if (error.message.includes("Failed to fetch")) {
      corsError.value =
        "Не удалось подключиться к серверу. Проверьте подключение к интернету или обратитесь к администратору.";
    } else {
      corsError.value = "Произошла ошибка при загрузке данных профиля";
    }
  } finally {
    loading.value = false;
  }
};

const fetchAppointments = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  loadingAppointments.value = true;

  try {
    // Список возможных endpoints для проверки
    const endpoints = [
      "/appointments/user",
      "/appointments/patient",
      "/appointments/my-appointments",
      "/user/appointments",
      "/patient/appointments",
      "/appointments?userId=" + userData.value.id,
    ];

    let success = false;

    // Пробуем каждый endpoint
    for (const endpoint of endpoints) {
      console.log(`Trying endpoint: ${API_URL}${endpoint}`);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Response status for ${endpoint}: ${response.status}`);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Appointments received from:", endpoint, result);

        // Обрабатываем разные форматы ответа
        if (Array.isArray(result)) {
          appointments.value = result;
        } else if (result.data && Array.isArray(result.data)) {
          appointments.value = result.data;
        } else if (result.appointments && Array.isArray(result.appointments)) {
          appointments.value = result.appointments;
        } else if (result.success && result.data) {
          appointments.value = Array.isArray(result.data) ? result.data : [];
        } else {
          appointments.value = [];
        }

        success = true;
        break;
      } else if (response.status === 403) {
        console.log(`❌ Forbidden (403) for: ${endpoint}`);
      } else if (response.status === 404) {
        console.log(`❌ Not Found (404) for: ${endpoint}`);
      } else {
        console.log(`❌ Error ${response.status} for: ${endpoint}`);
      }
    }

    if (!success) {
      console.error(
        "❌ All endpoints failed. User might not have appointments or API structure is different."
      );
      appointments.value = [];
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    appointments.value = [];
  } finally {
    loadingAppointments.value = false;
  }
};

const cancelAppointment = async (appointmentId) => {
  const token = localStorage.getItem("token");

  if (!token || !confirm("Вы уверены, что хотите отменить эту запись?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await fetchAppointments();
      saveMessage.value = "Запись успешно отменена";
      saveSuccess.value = true;
      setTimeout(() => {
        saveMessage.value = "";
      }, 3000);
    } else {
      const errorData = await response.json();
      saveMessage.value = errorData.message || "Ошибка при отмене записи";
      saveSuccess.value = false;
    }
  } catch (error) {
    console.error("Error canceling appointment:", error);
    saveMessage.value = "Ошибка соединения с сервером";
    saveSuccess.value = false;
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "confirmed":
      return "bg-blue-500/10 text-blue-500";
    case "completed":
      return "bg-green-500/10 text-green-500";
    case "cancelled":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Ожидает";
    case "confirmed":
      return "Подтверждено";
    case "completed":
      return "Завершено";
    case "cancelled":
      return "Отменено";
    default:
      return "Неизвестно";
  }
};

const formatAppointmentDate = (dateString) => {
  if (!dateString) return "Не указано";
  const date = new Date(dateString);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const formatTime = (time) => {
  if (!time) return "";
  return time.slice(0, 5);
};

const retryFetch = () => {
  loading.value = true;
  corsError.value = "";
  fetchUserData();
  fetchAppointments();
};

onMounted(async () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }

  await fetchUserData();
  await fetchAppointments();

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
  if (!dateString) return "Не указано";
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
  router.push("/");
};

const goToBooking = () => {
  router.push("/home");
};

const saveProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/");
    return;
  }

  saving.value = true;
  saveMessage.value = "";
  saveSuccess.value = false;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editedUser.value.name,
        email: editedUser.value.email,
        phone: editedUser.value.phone,
        address: editedUser.value.address,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      userData.value = result.data;
      localStorage.setItem("user", JSON.stringify(result.data));

      saveMessage.value = "Профиль успешно обновлён";
      saveSuccess.value = true;

      setTimeout(() => {
        saveMessage.value = "";
      }, 3000);
    } else {
      saveMessage.value = result.message || "Ошибка сохранения профиля";
      saveSuccess.value = false;
    }
  } catch (error) {
    console.error("Save profile error:", error);
    saveMessage.value = "Ошибка соединения с сервером";
    saveSuccess.value = false;
  } finally {
    saving.value = false;
  }
};
</script>
