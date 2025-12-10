<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[#111111] px-4 sm:px-6"
  >
    <h1
      class="font-clash text-lg sm:text-xl text-white p-4 sm:p-10 absolute left-0 right-0 top-0"
    >
      Care +
    </h1>
    <h2
      class="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6 font-clash mt-16 sm:mt-0"
    >
      Добро пожаловать
    </h2>

    <div class="w-full max-w-md bg-[#242424] p-4 sm:p-8 rounded-lg shadow-lg">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 pl-2 text-sm sm:text-base"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="Write your name"
            class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5BD4]"
            required
          />
        </div>

        <div class="mb-3 sm:mb-4">
          <label
            class="block text-[#ff6000] font-clash mb-2 pl-2 text-sm sm:text-base"
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
            class="block text-[#ff6000] font-clash mb-2 pl-2 text-sm sm:text-base"
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
          class="w-full bg-[#6C5BD4] text-white py-2.5 sm:py-3 rounded-lg transition-colors my-3 sm:my-4 sm:mt-5 font-clash text-sm sm:text-base hover:bg-[#5a4bc4] active:scale-[0.98]"
        >
          Register
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-gray-400 text-xs sm:text-sm">
          Already have an account?
          <router-link
            to="/login"
            class="text-[#6C5BD4] hover:underline font-clash"
          >
            Login
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
  name: "",
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
      "http://localhost:8000/api/auth/register",
      form
    );

    console.log("Регистрация прошла успешно!");
    success.value = "Вы успешно зарегистрировались!";

    form.name = "";
    form.email = "";
    form.password = "";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (err) {
    console.log(err.response?.data?.message || "Ошибка регистрации");
  }
};
</script>
