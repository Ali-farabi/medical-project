<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen transition-colors duration-300"
    :style="{ backgroundColor: isDark ? '#111111' : '#F9FAFB' }"
  >
    <div class="fixed top-3 right-4 z-50">
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

    <header
      class="border-b"
      :class="isDark ? 'border-gray-800' : 'border-gray-200'"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <h1
              class="font-clash text-xl sm:text-2xl font-medium transition-colors"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Care+ admin
            </h1>
            <nav class="hidden md:flex space-x-4">
              <router-link
                to="/admin"
                class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
                :class="
                  isDark
                    ? 'text-gray-300 hover:bg-[#242424]'
                    : 'text-gray-600 hover:bg-gray-100'
                "
              >
                Dashboard
              </router-link>
              <router-link
                to="/home"
                class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
                :class="
                  isDark
                    ? 'text-gray-300 hover:bg-[#242424]'
                    : 'text-gray-600 hover:bg-gray-100'
                "
              >
                Back to Home
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
                Total Doctors
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
                Specialties
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ specialties.length }}
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
                Avg Experience
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ avgExperience }} yr
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
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
                Avg Rating
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
          <div class="flex items-center justify-between">
            <h2
              class="text-xl font-clash font-bold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Doctors Management
            </h2>
            <div class="flex items-center space-x-3">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search doctors..."
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
                + Add Doctor
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
                  Doctor
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Specialty
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Experience
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Price
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Rating
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Actions
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
                    <!-- <img
                      :src="doctor.photo || 'https://i.pravatar.cc/300?img=12'"
                      class="w-12 h-12 rounded-full object-cover"
                      :alt="doctor.name"
                    /> -->
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
                    >{{ doctor.experience_years || 0 }} years</span
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
                    <span
                      class="text-xs font-clash"
                      :class="isDark ? 'text-gray-500' : 'text-gray-400'"
                      >({{ doctor.reviews_count || 0 }})</span
                    >
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
          {{ editingDoctor ? "Edit Doctor" : "Create New Doctor" }}
        </h3>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Full Name
            </label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
              placeholder="Dr. Ivan Ivanov"
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
              >Phone</label
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
              >Specialty
            </label>
            <select
              v-model="formData.specialty_id"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            >
              <option value="">Select specialty</option>
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
              >Experience (years)</label
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
              >Education</label
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
              placeholder="Medical University"
            />
          </div>

          <div class="col-span-2">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Description</label
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
              placeholder="Professional description..."
            ></textarea>
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
              >Consultation Price (₸)</label
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
              >Photo URL</label
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
            Cancel
          </button>
          <button
            @click="saveDoctor"
            :disabled="modalLoading"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-lg font-clash font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {{
              modalLoading ? "Saving..." : editingDoctor ? "Update" : "Create"
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
            Delete Doctor
          </h3>
          <p
            class="text-sm font-clash mb-6"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Are you sure you want to delete this doctor? This action cannot be
            undone.
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
              Cancel
            </button>
            <button
              @click="deleteDoctor"
              :disabled="modalLoading"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-clash font-medium hover:bg-red-600 transition-all disabled:opacity-50"
            >
              {{ modalLoading ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isDark = ref(true);
const doctors = ref([]);
const specialties = ref([]);
const searchQuery = ref("");
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingDoctor = ref(null);
const doctorToDelete = ref(null);
const modalLoading = ref(false);
const modalError = ref("");
const loading = ref(false);
const API_URL = "https://medical-backend-54hp.onrender.com/api";

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

const avgExperience = computed(() => {
  if (!doctors.value.length) return 0;
  const total = doctors.value.reduce(
    (sum, d) => sum + (d.experience_years || 0),
    0
  );
  return Math.round(total / doctors.value.length);
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
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(() => {
  fetchDoctors();
  fetchSpecialties();
});
</script>
