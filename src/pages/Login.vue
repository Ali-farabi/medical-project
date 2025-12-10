<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#111111] px-4 sm:px-6"
  >
    <div>
      <h1
        class="font-clash text-lg sm:text-xl text-white p-4 sm:p-10 absolute left-0 right-0 top-0"
      >
        Care +
      </h1>
    </div>
    <div
      class="w-full max-w-md bg-[#242424] p-4 sm:p-8 rounded-lg shadow-lg mt-16 sm:mt-0"
    >
      <h2
        class="text-xl sm:text-2xl text-white font-bold text-center font-clash mb-4 sm:mb-6"
      >
        Login
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 text-sm sm:text-base"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            placeholder="example@mail.com"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5BD4]"
            required
          />
        </div>

        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 text-sm sm:text-base"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5BD4]"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#6C5BD4] text-white py-2.5 sm:py-3 my-3 sm:my-5 font-clash rounded-lg hover:bg-[#5a4bc4] transition-colors text-sm sm:text-base active:scale-[0.98]"
        >
          Login
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-gray-400 text-xs sm:text-sm">
          Don't have an account?
          <router-link
            to="/register"
            class="text-[#6C5BD4] hover:underline font-clash"
          >
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const error = ref("");
const success = ref("");

const handleSubmit = async () => {
  error.value = "";
  success.value = "";
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      form
    );

    success.value = "Got it! You are logged in.";

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    form.email = "";
    form.password = "";

    setTimeout(() => {
      router.push("/home");
    }, 1500);
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed";
  }
};
</script>
