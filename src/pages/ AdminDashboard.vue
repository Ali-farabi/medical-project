<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen transition-colors duration-300"
    :style="{ backgroundColor: isDark ? '#111111' : '#F9FAFB' }"
  >
    <!-- Theme Toggle -->
    <div class="fixed top-4 right-4 z-50">
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

    <!-- Header -->
    <header
      class="border-b"
      :class="isDark ? 'border-gray-800' : 'border-gray-200'"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-8">
            <h1
              class="text-2xl font-clash font-bold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Care+ Admin
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
          <button
            @click="logout"
            class="px-4 py-2 rounded-lg font-clash text-sm font-medium transition-all"
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

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                Total Users
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ users.length }}
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
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
                Admins
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ users.filter((u) => u.role === "admin").length }}
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
                Regular Users
              </p>
              <p
                class="text-3xl font-clash font-bold mt-2"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                {{ users.filter((u) => u.role === "user").length }}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
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
              User Management
            </h2>
            <div class="flex items-center space-x-3">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
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
                + Add User
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
                  User
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Email
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Role
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-clash font-semibold uppercase tracking-wider"
                  :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                >
                  Phone
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
                v-for="user in filteredUsers"
                :key="user.id"
                class="border-b transition-colors"
                :class="
                  isDark
                    ? 'border-gray-800 hover:bg-[#333333]'
                    : 'border-gray-200 hover:bg-gray-50'
                "
              >
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6000] to-[#ff8c42] flex items-center justify-center text-white font-clash font-bold"
                    >
                      {{ user.name ? user.name.charAt(0).toUpperCase() : "?" }}
                    </div>
                    <span
                      class="font-clash font-medium"
                      :class="isDark ? 'text-white' : 'text-[#111111]'"
                    >
                      {{ user.name || "No name" }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="font-clash text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                  >
                    {{ user.email }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-clash font-medium"
                    :class="
                      user.role === 'admin'
                        ? 'bg-purple-500/10 text-purple-500'
                        : 'bg-blue-500/10 text-blue-500'
                    "
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="font-clash text-sm"
                    :class="isDark ? 'text-gray-300' : 'text-gray-600'"
                  >
                    {{ user.phone || "N/A" }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="openEditModal(user)"
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
                      @click="confirmDelete(user)"
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

    <!-- Modal for Create/Edit User -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="w-full max-w-md rounded-2xl p-6 border"
        :class="
          isDark ? 'bg-[#242424] border-gray-800' : 'bg-white border-gray-200'
        "
      >
        <h3
          class="text-xl font-clash font-bold mb-6"
          :class="isDark ? 'text-white' : 'text-[#111111]'"
        >
          {{ editingUser ? "Edit User" : "Create New User" }}
        </h3>

        <div class="space-y-4">
          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Name
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
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Email
            </label>
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            />
          </div>

          <div v-if="!editingUser">
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Password
            </label>
            <input
              v-model="formData.password"
              type="password"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Phone
            </label>
            <input
              v-model="formData.phone"
              type="tel"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            />
          </div>

          <div>
            <label
              class="block text-sm font-clash font-medium mb-2"
              :class="isDark ? 'text-gray-300' : 'text-gray-700'"
            >
              Role
            </label>
            <select
              v-model="formData.role"
              class="w-full px-4 py-3 rounded-lg border font-clash outline-none"
              :class="
                isDark
                  ? 'bg-[#333333] border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-[#111111]'
              "
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div v-if="modalError" class="p-3 rounded-lg bg-red-500/10">
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
            @click="saveUser"
            :disabled="modalLoading"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-lg font-clash font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {{ modalLoading ? "Saving..." : editingUser ? "Update" : "Create" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
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
            Delete User
          </h3>
          <p
            class="text-sm font-clash mb-6"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Are you sure you want to delete this user? This action cannot be
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
              @click="deleteUser"
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
const users = ref([]);
const searchQuery = ref("");
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingUser = ref(null);
const userToDelete = ref(null);
const modalLoading = ref(false);
const modalError = ref("");

const API_URL = "https://medical-backend-54hp.onrender.com/api";

const formData = ref({
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "user",
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const result = await response.json();
      users.value = result.data || [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const openCreateModal = () => {
  editingUser.value = null;
  formData.value = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  };
  modalError.value = "";
  showModal.value = true;
};

const openEditModal = (user) => {
  editingUser.value = user;
  formData.value = {
    name: user.name || "",
    email: user.email || "",
    password: "",
    phone: user.phone || "",
    role: user.role || "user",
  };
  modalError.value = "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingUser.value = null;
  modalError.value = "";
};

const saveUser = async () => {
  const token = localStorage.getItem("token");
  modalLoading.value = true;
  modalError.value = "";

  try {
    const url = editingUser.value
      ? `${API_URL}/users/${editingUser.value.id}`
      : `${API_URL}/auth/register`;

    const method = editingUser.value ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      await fetchUsers();
      closeModal();
    } else {
      const result = await response.json();
      modalError.value = result.message || "Error saving user";
    }
  } catch (error) {
    modalError.value = "Network error";
  } finally {
    modalLoading.value = false;
  }
};

const confirmDelete = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async () => {
  const token = localStorage.getItem("token");
  modalLoading.value = true;

  try {
    const response = await fetch(`${API_URL}/users/${userToDelete.value.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      await fetchUsers();
      showDeleteModal.value = false;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    modalLoading.value = false;
  }
};
</script>
