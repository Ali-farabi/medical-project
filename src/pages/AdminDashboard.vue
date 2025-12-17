<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen transition-colors duration-300"
    :style="{ backgroundColor: isDark ? '#111111' : '#F9FAFB' }"
  >
    <div class="fixed top-3 right-4 z-50 flex items-center space-x-3">
      <button
        @click="toggleNotifications"
        class="relative p-3 rounded-xl transition-all duration-300 border backdrop-blur-sm"
        :class="
          isDark
            ? 'bg-[#242424] border-gray-700 text-white hover:bg-[#333333]'
            : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 shadow-md'
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span
          v-if="unreadNotificationsCount > 0"
          class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
        >
          {{ unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount }}
        </span>
      </button>

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
          v-if="isDark"
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
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    </div>

    <transition name="slide">
      <div
        v-if="showNotifications"
        class="fixed top-16 right-4 z-40 w-96 max-h-[80vh] overflow-hidden rounded-2xl border shadow-2xl"
        :class="
          isDark ? 'bg-[#242424] border-gray-800' : 'bg-white border-gray-200'
        "
      >
        <div
          class="p-4 border-b flex items-center justify-between"
          :class="isDark ? 'border-gray-800' : 'border-gray-200'"
        >
          <h3
            class="font-clash text-lg font-bold"
            :class="isDark ? 'text-white' : 'text-[#111111]'"
          >
            Уведомления
          </h3>
          <button
            v-if="notifications.length > 0"
            @click="markAllAsRead"
            class="text-xs font-clash font-medium text-[#ff6000] hover:text-[#ff8c42] transition-colors"
          >
            Отметить все
          </button>
        </div>

        <div class="overflow-y-auto max-h-[calc(80vh-4rem)]">
          <div v-if="notifications.length === 0" class="p-8 text-center">
            <svg
              class="w-16 h-16 mx-auto mb-3"
              :class="isDark ? 'text-gray-600' : 'text-gray-300'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p
              class="font-clash text-sm"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              Нет новых уведомлений
            </p>
          </div>

          <div
            v-for="notification in notifications"
            :key="notification.id"
            @click="viewAppointmentDetails(notification)"
            class="p-4 border-b cursor-pointer transition-colors"
            :class="[
              isDark ? 'border-gray-800' : 'border-gray-200',
              notification.read
                ? isDark
                  ? 'hover:bg-[#2a2a2a]'
                  : 'hover:bg-gray-50'
                : isDark
                ? 'bg-[#2a2a2a] hover:bg-[#333333]'
                : 'bg-blue-50 hover:bg-blue-100',
            ]"
          >
            <div class="flex items-start space-x-3">
              <div
                class="p-2 rounded-lg flex-shrink-0"
                :class="
                  notification.type === 'new_appointment'
                    ? 'bg-green-500/10'
                    : notification.type === 'cancelled'
                    ? 'bg-red-500/10'
                    : 'bg-blue-500/10'
                "
              >
                <svg
                  class="w-5 h-5"
                  :class="
                    notification.type === 'new_appointment'
                      ? 'text-green-500'
                      : notification.type === 'cancelled'
                      ? 'text-red-500'
                      : 'text-blue-500'
                  "
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
              <div class="flex-1 min-w-0">
                <p
                  class="font-clash text-sm font-medium mb-1"
                  :class="isDark ? 'text-white' : 'text-[#111111]'"
                >
                  {{ notification.title }}
                </p>
                <p
                  class="font-clash text-xs mb-2"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  {{ notification.message }}
                </p>
                <p
                  class="font-clash text-xs"
                  :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                >
                  {{ formatNotificationTime(notification.created_at) }}
                </p>
              </div>
              <div
                v-if="!notification.read"
                class="w-2 h-2 bg-[#ff6000] rounded-full flex-shrink-0 mt-1"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <header
      class="border-b"
      :class="isDark ? 'border-gray-800' : 'border-gray-200'"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <router-link
              to="/home"
              class="font-clash text-xl sm:text-2xl font-medium transition-colors"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Care+ admin
            </router-link>
            <nav class="hidden md:flex space-x-4">
              <button
                @click="activeTab = 'doctors'"
                class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
                :class="
                  activeTab === 'doctors'
                    ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white'
                    : isDark
                    ? 'text-gray-300 hover:bg-[#242424]'
                    : 'text-gray-600 hover:bg-gray-100'
                "
              >
                Врачи
              </button>
              <button
                @click="activeTab = 'appointments'"
                class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
                :class="
                  activeTab === 'appointments'
                    ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white'
                    : isDark
                    ? 'text-gray-300 hover:bg-[#242424]'
                    : 'text-gray-600 hover:bg-gray-100'
                "
              >
                Записи
              </button>
              <router-link
                to="/home"
                class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
                :class="
                  isDark
                    ? 'text-gray-300 hover:bg-[#242424]'
                    : 'text-gray-600 hover:bg-gray-100'
                "
              >
                На главную
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          class="p-6 rounded-2xl border"
          :class="
            isDark
              ? 'bg-[#242424] border-gray-800'
              : 'bg-white border-gray-200 shadow-sm'
          "
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-clash font-medium"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Всего врачей
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ doctors.length }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-blue-500/10">
              <svg
                class="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="p-6 rounded-2xl border"
          :class="
            isDark
              ? 'bg-[#242424] border-gray-800'
              : 'bg-white border-gray-200 shadow-sm'
          "
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-clash font-medium"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Всего записей
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ appointments.length }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-purple-500/10">
              <svg
                class="w-8 h-8 text-purple-500"
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
          </div>
        </div>

        <div
          class="p-6 rounded-2xl border"
          :class="
            isDark
              ? 'bg-[#242424] border-gray-800'
              : 'bg-white border-gray-200 shadow-sm'
          "
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-clash font-medium"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Новых сегодня
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ todayAppointmentsCount }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-green-500/10">
              <svg
                class="w-8 h-8 text-green-500"
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
            </div>
          </div>
        </div>

        <div
          class="p-6 rounded-2xl border"
          :class="
            isDark
              ? 'bg-[#242424] border-gray-800'
              : 'bg-white border-gray-200 shadow-sm'
          "
        >
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-sm font-clash font-medium"
                :class="isDark ? 'text-gray-400' : 'text-gray-600'"
              >
                Средний рейтинг
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ avgRating }}
              </p>
            </div>
            <div class="p-3 rounded-xl bg-yellow-500/10">
              <svg
                class="w-8 h-8 text-[#FF6000]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="activeTab === 'doctors'"
        class="rounded-2xl border overflow-hidden"
        :class="
          isDark
            ? 'bg-[#242424] border-gray-800'
            : 'bg-white border-gray-200 shadow-sm'
        "
      >
        <div
          class="p-6 border-b"
          :class="isDark ? 'border-gray-800' : 'border-gray-200'"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <h2
              class="text-xl font-clash font-bold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Управление врачами
            </h2>
            <div class="flex items-center space-x-3">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск врачей..."
                class="px-4 py-2 rounded-lg border font-clash text-sm outline-none"
                :class="
                  isDark
                    ? 'bg-[#333333] border-gray-700 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-[#111111] placeholder-gray-400'
                "
              />
              <button
                @click="openCreateModal"
                class="px-4 py-2 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-lg font-clash text-sm font-medium hover:shadow-lg transition-all"
              >
                + Add doctor
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead
              class="border-b"
              :class="isDark ? 'border-gray-800' : 'border-gray-200'"
            >
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Врач
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Специальность
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Опыт
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Цена
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Рейтинг
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="doctor in filteredDoctors"
                :key="doctor.id"
                class="border-b transition-colors"
                :class="
                  isDark
                    ? 'border-gray-800 hover:bg-[#333333]'
                    : 'border-gray-200 hover:bg-gray-50'
                "
              >
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div>
                      <div
                        class="font-clash font-medium"
                        :class="isDark ? 'text-white' : 'text-[#111111]'"
                      >
                        {{ doctor.name }}
                      </div>
                      <div
                        class="text-xs font-clash"
                        :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                      >
                        {{ doctor.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-clash font-medium bg-[#6C5BD4]/10 text-[#6C5BD4]"
                    >{{ doctor.specialty_name || "N/A" }}</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span
                    class="font-clash text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                    >{{ doctor.experience_years || 0 }} лет</span
                  >
                </td>
                <td class="px-6 py-4">
                  <span
                    class="font-clash text-sm font-medium"
                    :class="isDark ? 'text-green-400' : 'text-green-600'"
                    >{{ doctor.consultation_price || 0 }} ₸</span
                  >
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-1">
                    <span
                      class="font-clash text-sm font-medium"
                      :class="isDark ? 'text-[#FF6000]' : 'text-[#FF6000]'"
                      >{{ doctor.rating || 0 }}</span
                    >
                    <span class="text-yellow-500"></span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="openEditModal(doctor)"
                      class="p-2 rounded-lg transition-colors"
                      :class="
                        isDark
                          ? 'hover:bg-blue-500/10 text-blue-400'
                          : 'hover:bg-blue-50 text-blue-600'
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(doctor)"
                      class="p-2 rounded-lg transition-colors"
                      :class="
                        isDark
                          ? 'hover:bg-red-500/10 text-red-400'
                          : 'hover:bg-red-50 text-red-600'
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-show="activeTab === 'appointments'"
        class="rounded-2xl border overflow-hidden"
        :class="
          isDark
            ? 'bg-[#242424] border-gray-800'
            : 'bg-white border-gray-200 shadow-sm'
        "
      >
        <div
          class="p-6 border-b"
          :class="isDark ? 'border-gray-800' : 'border-gray-200'"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <h2
              class="text-xl font-clash font-bold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Все записи
            </h2>
            <div class="flex items-center space-x-3">
              <select
                v-model="appointmentFilter"
                class="px-4 py-2 rounded-lg border font-clash text-sm outline-none"
                :class="
                  isDark
                    ? 'bg-[#333333] border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-200 text-[#111111]'
                "
              >
                <option value="all">Все</option>
                <option value="pending">Ожидает</option>
                <option value="confirmed">Подтверждено</option>
                <option value="completed">Завершено</option>
                <option value="cancelled">Отменено</option>
              </select>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead
              class="border-b"
              :class="isDark ? 'border-gray-800' : 'border-gray-200'"
            >
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Пациент
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Врач
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Дата и время
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Жалобы
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Статус
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="appointment in filteredAppointments"
                :key="appointment.id"
                class="border-b transition-colors"
                :class="
                  isDark
                    ? 'border-gray-800 hover:bg-[#333333]'
                    : 'border-gray-200 hover:bg-gray-50'
                "
              >
                <td class="px-6 py-4">
                  <div>
                    <div
                      class="font-clash font-medium"
                      :class="isDark ? 'text-white' : 'text-[#111111]'"
                    >
                      {{ appointment.patient_name || "Пациент" }}
                    </div>
                    <div
                      class="text-xs font-clash"
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                    >
                      ID: {{ appointment.user_id }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div>
                    <div
                      class="font-clash font-medium"
                      :class="isDark ? 'text-white' : 'text-[#111111]'"
                    >
                      {{ appointment.doctor_name || "Врач" }}
                    </div>
                    <div
                      class="text-xs font-clash"
                      :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                    >
                      {{ appointment.specialty_name }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="font-clash text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                  >
                    {{ formatAppointmentDate(appointment.appointment_date) }}
                  </div>
                  <div
                    class="text-xs font-clash"
                    :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                  >
                    {{ formatTime(appointment.appointment_time) }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div
                    class="font-clash text-sm max-w-xs truncate"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                  >
                    {{ appointment.complaints || "Не указано" }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-clash font-medium"
                    :class="getStatusClass(appointment.status)"
                  >
                    {{ getStatusText(appointment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewAppointmentDetails(appointment)"
                      class="p-2 rounded-lg transition-colors"
                      :class="
                        isDark
                          ? 'hover:bg-blue-500/10 text-blue-400'
                          : 'hover:bg-blue-50 text-blue-600'
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-2xl rounded-2xl p-6 border my-8"
        :class="
          isDark ? 'bg-[#242424] border-gray-800' : 'bg-white border-gray-200'
        "
      >
        <h3
          class="text-xl font-clash font-bold mb-6"
          :class="isDark ? 'text-white' : 'text-[#111111]'"
        >
          {{ editingDoctor ? "Редактировать врача" : "Добавить врача" }}
        </h3>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Полное имя</label
            >
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="Доктор Иван Иванов"
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="doctor@hospital.com"
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Телефон</label
            >
            <input
              v-model="formData.phone"
              type="tel"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="+7 777 123 4567"
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Специальность</label
            >
            <select
              v-model="formData.specialty_id"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            >
              <option value="">Выберите специальность</option>
              <option
                v-for="spec in specialties"
                :key="spec.id"
                :value="spec.id"
              >
                {{ spec.name }}
              </option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Опыт (лет)</label
            >
            <input
              v-model.number="formData.experience_years"
              type="number"
              min="0"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="5"
            />
          </div>

          <div class="col-span-2">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Образование</label
            >
            <input
              v-model="formData.education"
              type="text"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="Медицинский университет"
            />
          </div>

          <div class="col-span-2">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Описание</label
            >
            <textarea
              v-model="formData.description"
              rows="3"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none resize-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="Профессиональное описание..."
            ></textarea>
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Цена консультации (₸)</label
            >
            <input
              v-model.number="formData.consultation_price"
              type="number"
              min="0"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="5000"
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >URL фото</label
            >
            <input
              v-model="formData.photo"
              type="text"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="https://..."
            />
          </div>

          <div
            v-if="modalError"
            class="col-span-2 p-3 rounded-lg bg-red-500/10"
          >
            <p class="text-red-500 text-sm font-clash">{{ modalError }}</p>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button
            @click="closeModal"
            class="flex-1 px-4 py-3 rounded-lg font-clash font-medium transition-all"
            :class="
              isDark
                ? 'bg-[#333333] text-gray-300 hover:bg-[#404040]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            Отмена
          </button>
          <button
            @click="saveDoctor"
            :disabled="modalLoading"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-lg font-clash font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {{
              modalLoading
                ? "Сохранение..."
                : editingDoctor
                ? "Обновить"
                : "Создать"
            }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="showDeleteModal = false"
    >
      <div
        class="w-full max-w-sm rounded-2xl p-6 border"
        :class="
          isDark ? 'bg-[#242424] border-gray-800' : 'bg-white border-gray-200'
        "
      >
        <div class="text-center">
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3
            class="text-lg font-clash font-bold mb-2"
            :class="isDark ? 'text-white' : 'text-[#111111]'"
          >
            Удалить врача
          </h3>
          <p
            class="text-sm font-clash mb-6"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Вы уверены, что хотите удалить этого врача? Это действие нельзя
            отменить.
          </p>
          <div class="flex space-x-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 rounded-lg font-clash font-medium transition-all"
              :class="
                isDark
                  ? 'bg-[#333333] text-gray-300 hover:bg-[#404040]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
            >
              Отмена
            </button>
            <button
              @click="deleteDoctor"
              :disabled="modalLoading"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-clash font-medium hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {{ modalLoading ? "Удаление..." : "Удалить" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showAppointmentModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="showAppointmentModal = false"
    >
      <div
        class="w-full max-w-2xl rounded-2xl p-6 border"
        :class="
          isDark ? 'bg-[#242424] border-gray-800' : 'bg-white border-gray-200'
        "
      >
        <h3
          class="text-xl font-clash font-bold mb-6"
          :class="isDark ? 'text-white' : 'text-[#111111]'"
        >
          Детали записи
        </h3>

        <div v-if="selectedAppointment" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Пациент
              </p>
              <p
                class="font-clash font-medium"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ selectedAppointment.patient_name || "Не указано" }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Врач
              </p>
              <p
                class="font-clash font-medium"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ selectedAppointment.doctor_name }}
              </p>
              <p
                class="text-xs font-clash"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                {{ selectedAppointment.specialty_name }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Дата
              </p>
              <p
                class="font-clash"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{
                  formatAppointmentDate(selectedAppointment.appointment_date)
                }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Время
              </p>
              <p
                class="font-clash"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ formatTime(selectedAppointment.appointment_time) }}
              </p>
            </div>
          </div>

          <div>
            <p
              class="text-xs font-clash font-medium mb-1"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              Жалобы
            </p>
            <p
              class="font-clash"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              {{ selectedAppointment.complaints || "Не указано" }}
            </p>
          </div>

          <div v-if="selectedAppointment.chronic_diseases">
            <p
              class="text-xs font-clash font-medium mb-1"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              Хронические заболевания
            </p>
            <p
              class="font-clash"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              {{ selectedAppointment.chronic_diseases }}
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-4"
            v-if="selectedAppointment.height || selectedAppointment.weight"
          >
            <div v-if="selectedAppointment.height">
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Рост
              </p>
              <p
                class="font-clash"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ selectedAppointment.height }} см
              </p>
            </div>
            <div v-if="selectedAppointment.weight">
              <p
                class="text-xs font-clash font-medium mb-1"
                :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >
                Вес
              </p>
              <p
                class="font-clash"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ selectedAppointment.weight }} кг
              </p>
            </div>
          </div>

          <div>
            <p
              class="text-xs font-clash font-medium mb-1"
              :class="isDark ? 'text-gray-400' : 'text-gray-500'"
            >
              Статус
            </p>
            <span
              class="px-3 py-1 rounded-full text-xs font-clash font-medium"
              :class="getStatusClass(selectedAppointment.status)"
            >
              {{ getStatusText(selectedAppointment.status) }}
            </span>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button
            @click="showAppointmentModal = false"
            class="px-6 py-2 rounded-lg font-clash font-medium transition-all"
            :class="
              isDark
                ? 'bg-[#333333] text-gray-300 hover:bg-[#404040]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(true);
const doctors = ref([]);
const specialties = ref([]);
const appointments = ref([]);
const notifications = ref([]);
const searchQuery = ref("");
const appointmentFilter = ref("all");
const showModal = ref(false);
const showDeleteModal = ref(false);
const showNotifications = ref(false);
const showAppointmentModal = ref(false);
const editingDoctor = ref(null);
const doctorToDelete = ref(null);
const selectedAppointment = ref(null);
const modalLoading = ref(false);
const modalError = ref("");
const loading = ref(false);
const activeTab = ref("appointments");

const API_URL = "https://medical-backend-54hp.onrender.com/api";

let pollingInterval = null;

const formData = ref({
  name: "",
  email: "",
  phone: "",
  specialty_id: "",
  experience_years: 0,
  education: "",
  description: "",
  consultation_price: 0,
  photo: "",
});

const filteredDoctors = computed(() => {
  if (!searchQuery.value) return doctors.value;

  return doctors.value.filter(
    (doctor) =>
      doctor.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doctor.specialty_name
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const filteredAppointments = computed(() => {
  if (appointmentFilter.value === "all") return appointments.value;
  return appointments.value.filter(
    (apt) => apt.status === appointmentFilter.value
  );
});

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

const todayAppointmentsCount = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return appointments.value.filter(
    (apt) => apt.created_at && apt.created_at.startsWith(today)
  ).length;
});

const avgRating = computed(() => {
  if (!doctors.value.length) return 0;
  const total = doctors.value.reduce((sum, d) => sum + (d.rating || 0), 0);
  return (total / doctors.value.length).toFixed(1);
});

const fetchDoctors = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${API_URL}/doctors`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    doctors.value = await res.json();
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
  } finally {
    loading.value = false;
  }
};

const fetchSpecialties = async () => {
  const res = await fetch(`${API_URL}/specialties`);
  specialties.value = await res.json();
};

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch appointments");

    const data = await res.json();
    const newAppointments = Array.isArray(data) ? data : data.data || [];

    checkForNewAppointments(newAppointments);

    appointments.value = newAppointments;
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
  }
};

const checkForNewAppointments = (newAppointments) => {
  if (appointments.value.length === 0) return;

  const existingIds = new Set(appointments.value.map((a) => a.id));

  newAppointments.forEach((appointment) => {
    if (!existingIds.has(appointment.id)) {
      createNotification(appointment);
    }
  });
};

const createNotification = (appointment) => {
  const notification = {
    id: `notif-${appointment.id}-${Date.now()}`,
    type: "new_appointment",
    title: "Новая запись!",
    message: `${appointment.patient_name || "Пациент"} записался к ${
      appointment.doctor_name
    } на ${formatAppointmentDate(appointment.appointment_date)} в ${formatTime(
      appointment.appointment_time
    )}`,
    appointment_id: appointment.id,
    appointment_data: appointment,
    read: false,
    created_at: new Date().toISOString(),
  };

  notifications.value.unshift(notification);

  saveNotifications();

  showBrowserNotification(notification);
};

const saveNotifications = () => {
  try {
    localStorage.setItem(
      "admin_notifications",
      JSON.stringify(notifications.value)
    );
  } catch (error) {
    console.error("Failed to save notifications:", error);
  }
};

const loadNotifications = () => {
  try {
    const saved = localStorage.getItem("admin_notifications");
    if (saved) {
      notifications.value = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load notifications:", error);
  }
};

const showBrowserNotification = (notification) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(notification.title, {
      body: notification.message,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
    });
  }
};

const requestNotificationPermission = async () => {
  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true));
  saveNotifications();
};

const viewAppointmentDetails = (notificationOrAppointment) => {
  if (notificationOrAppointment.appointment_data) {
    selectedAppointment.value = notificationOrAppointment.appointment_data;

    const notification = notifications.value.find(
      (n) => n.id === notificationOrAppointment.id
    );
    if (notification) {
      notification.read = true;
      saveNotifications();
    }
  } else {
    selectedAppointment.value = notificationOrAppointment;
  }

  showNotifications.value = false;
  showAppointmentModal.value = true;
};

const formatNotificationTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Только что";
  if (diffMins < 60) return `${diffMins} мин назад`;
  if (diffHours < 24) return `${diffHours} ч назад`;
  if (diffDays < 7) return `${diffDays} дн назад`;

  return date.toLocaleDateString("ru-RU");
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
      return "bg-[#6C5BD4]/10 text-[#6C5BD4]";
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
      return "Подтверждено";
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

const openCreateModal = () => {
  editingDoctor.value = null;
  modalError.value = "";
  formData.value = {
    name: "",
    email: "",
    phone: "",
    specialty_id: "",
    experience_years: 0,
    education: "",
    description: "",
    consultation_price: 0,
    photo: "",
  };
  showModal.value = true;
};

const openEditModal = (doctor) => {
  editingDoctor.value = doctor;
  modalError.value = "";
  formData.value = { ...doctor };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalError.value = "";
};

const saveDoctor = async () => {
  try {
    modalLoading.value = true;
    modalError.value = "";

    const method = editingDoctor.value ? "PUT" : "POST";
    const url = editingDoctor.value
      ? `${API_URL}/doctors/${editingDoctor.value.id}`
      : `${API_URL}/doctors`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData.value),
    });

    if (!res.ok) throw new Error("Failed to save doctor");

    await fetchDoctors();
    showModal.value = false;
  } catch (e) {
    modalError.value = e.message;
  } finally {
    modalLoading.value = false;
  }
};

const confirmDelete = (doctor) => {
  doctorToDelete.value = doctor;
  showDeleteModal.value = true;
};

const deleteDoctor = async () => {
  try {
    modalLoading.value = true;

    await fetch(`${API_URL}/doctors/${doctorToDelete.value.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await fetchDoctors();
    showDeleteModal.value = false;
  } finally {
    modalLoading.value = false;
  }
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

const startPolling = () => {
  pollingInterval = setInterval(() => {
    fetchAppointments();
  }, 30000);
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

onMounted(async () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }

  loadNotifications();

  await requestNotificationPermission();

  await Promise.all([fetchDoctors(), fetchSpecialties(), fetchAppointments()]);

  startPolling();
});

onUnmounted(() => {
  stopPolling();
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
