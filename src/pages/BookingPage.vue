<template>
  <div
    :class="isDark ? 'dark' : 'light'"
    class="min-h-screen transition-colors duration-300"
  >
    <div
      class="min-h-screen transition-colors duration-300"
      :class="isDark ? 'bg-[#111111]' : 'bg-[#F9FAFB]'"
    >
      <header
        class="border-b"
        :class="isDark ? 'border-gray-800' : 'border-gray-200'"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <button
              @click="goBack"
              class="flex items-center space-x-2 font-clash font-medium transition-colors"
              :class="
                isDark
                  ? 'text-white hover:text-gray-300'
                  : 'text-[#111111] hover:text-gray-700'
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Назад</span>
            </button>

            <h1
              class="font-clash text-xl font-semibold"
              :class="isDark ? 'text-white' : 'text-[#111111]'"
            >
              Запись к врачу
            </h1>

            <div class="w-20"></div>
          </div>
        </div>
      </header>

      <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          v-if="errorMessage"
          class="max-w-6xl mx-auto mb-6 p-4 rounded-xl border flex items-start space-x-3"
          :class="
            isDark
              ? 'bg-red-900/20 border-red-800 text-red-200'
              : 'bg-red-50 border-red-200 text-red-800'
          "
        >
          <svg
            class="w-5 h-5 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="flex-1">
            <p class="font-clash font-medium">{{ errorMessage }}</p>
          </div>
          <button @click="errorMessage = ''" class="flex-shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div class="space-y-6">
            <div
              v-if="loading"
              class="rounded-2xl border p-6 transition-all duration-300"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800'
                  : 'bg-white border-gray-200 shadow-sm'
              "
            >
              <div class="animate-pulse space-y-4">
                <div class="h-8 bg-gray-700 rounded w-3/4"></div>
                <div class="h-4 bg-gray-700 rounded w-1/2"></div>
                <div class="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            </div>

            <div
              v-else-if="doctor"
              class="rounded-2xl border p-6 transition-all duration-300"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800'
                  : 'bg-white border-gray-200 shadow-sm'
              "
            >
              <div class="flex items-start space-x-4 mb-4">
                <div class="flex-1">
                  <h2
                    class="font-clash text-2xl font-bold mb-2"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ doctor.name }}
                  </h2>
                  <span
                    class="inline-block px-3 py-1 rounded-full text-sm font-clash font-medium bg-[#6C5BD4]/10 text-[#6C5BD4] mb-3"
                  >
                    {{ doctor.specialty_name || "Специальность не указана" }}
                  </span>

                  <div class="space-y-2">
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
                  </div>
                </div>
              </div>

              <div
                class="pt-4 border-t"
                :class="isDark ? 'border-gray-700' : 'border-gray-200'"
              >
                <p
                  class="text-sm font-clash mb-2"
                  :class="isDark ? 'text-gray-500' : 'text-gray-500'"
                >
                  Стоимость консультации
                </p>
                <p class="text-2xl font-clash font-bold text-[#ff6000]">
                  {{ doctor.consultation_price || 0 }} ₸
                </p>
              </div>
            </div>

            <div
              class="rounded-2xl border p-6 transition-all duration-300"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800'
                  : 'bg-white border-gray-200 shadow-sm'
              "
            >
              <h3
                class="font-clash text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Выберите дату
              </h3>

              <div class="space-y-4">
                <div class="flex items-center justify-between mb-4">
                  <button
                    @click="previousMonth"
                    class="p-2 rounded-lg transition-colors"
                    :class="
                      isDark
                        ? 'hover:bg-[#333333] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <span
                    class="font-clash font-medium"
                    :class="isDark ? 'text-white' : 'text-[#111111]'"
                  >
                    {{ currentMonthYear }}
                  </span>

                  <button
                    @click="nextMonth"
                    class="p-2 rounded-lg transition-colors"
                    :class="
                      isDark
                        ? 'hover:bg-[#333333] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-7 gap-2">
                  <div
                    v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']"
                    :key="day"
                    class="text-center text-xs font-clash font-medium py-2"
                    :class="isDark ? 'text-gray-500' : 'text-gray-500'"
                  >
                    {{ day }}
                  </div>

                  <div
                    v-for="(day, index) in calendarDays"
                    :key="index"
                    @click="
                      day.isCurrentMonth && !day.isPast
                        ? selectDate(day.date)
                        : null
                    "
                    class="aspect-square flex items-center justify-center rounded-lg font-clash text-sm transition-all cursor-pointer"
                    :class="[
                      day.isCurrentMonth
                        ? day.isPast
                          ? isDark
                            ? 'text-gray-600'
                            : 'text-gray-300'
                          : day.isSelected
                          ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white font-semibold'
                          : isDark
                          ? 'text-white hover:bg-[#333333]'
                          : 'text-[#111111] hover:bg-gray-100'
                        : isDark
                        ? 'text-gray-700'
                        : 'text-gray-400',
                      !day.isCurrentMonth || day.isPast
                        ? 'cursor-not-allowed'
                        : '',
                    ]"
                  >
                    {{ day.day }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div
              class="rounded-2xl border p-6 transition-all duration-300"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800'
                  : 'bg-white border-gray-200 shadow-sm'
              "
            >
              <h3
                class="font-clash text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Доступное время
              </h3>

              <div
                v-if="loadingSlots"
                class="flex items-center justify-center py-20"
              >
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6000]"
                ></div>
              </div>

              <div
                v-else-if="!selectedDate"
                class="flex flex-col items-center justify-center py-20"
              >
                <svg
                  class="w-16 h-16 mb-4"
                  :class="isDark ? 'text-gray-600' : 'text-gray-300'"
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
                <p
                  class="font-clash"
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                >
                  Выберите дату в календаре
                </p>
              </div>

              <div v-else-if="!slotsError" class="space-y-6">
                <div
                  v-for="period in timePeriods"
                  :key="period.name"
                  v-show="period.slots.length > 0"
                >
                  <h4
                    class="font-clash text-sm font-medium mb-3"
                    :class="isDark ? 'text-gray-400' : 'text-gray-600'"
                  >
                    {{ period.name }}
                  </h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="slot in period.slots"
                      :key="slot"
                      @click="selectTime(slot)"
                      class="px-4 py-3 rounded-xl font-clash text-sm font-medium transition-all border"
                      :class="
                        selectedTime === slot
                          ? 'bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white border-transparent'
                          : isDark
                          ? 'bg-[#333333] border-gray-700 text-white hover:border-gray-600'
                          : 'bg-gray-50 border-gray-200 text-[#111111] hover:bg-gray-100'
                      "
                    >
                      {{ formatTime(slot) }}
                    </button>
                  </div>
                </div>

                <div
                  v-if="availableSlots.length === 0"
                  class="text-center py-8"
                >
                  <p
                    class="font-clash"
                    :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                  >
                    На выбранную дату нет свободных слотов
                  </p>
                </div>
              </div>

              <div
                v-else
                class="flex flex-col items-center justify-center py-20"
              >
                <svg
                  class="w-16 h-16 mb-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p
                  class="font-clash text-center mb-4"
                  :class="isDark ? 'text-gray-400' : 'text-gray-500'"
                >
                  Не удалось загрузить доступные слоты
                </p>
                <button
                  @click="fetchAvailableSlots"
                  class="px-4 py-2 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash text-sm font-medium hover:shadow-lg transition-all"
                >
                  Попробовать снова
                </button>
              </div>
            </div>

            <div
              v-if="selectedDate && selectedTime"
              class="rounded-2xl border p-6 transition-all duration-300"
              :class="
                isDark
                  ? 'bg-[#242424] border-gray-800'
                  : 'bg-white border-gray-200 shadow-sm'
              "
            >
              <h3
                class="font-clash text-lg font-semibold mb-4"
                :class="isDark ? 'text-white' : 'text-[#111111]'"
              >
                Медицинская информация
              </h3>

              <div class="space-y-4">
                <div>
                  <label
                    class="block text-sm font-clash font-medium mb-2"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Жалобы <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="medicalInfo.complaints"
                    rows="3"
                    placeholder="Опишите ваши симптомы и жалобы"
                    class="w-full px-4 py-3 rounded-xl font-clash text-sm border transition-all"
                    :class="
                      isDark
                        ? 'bg-[#333333] border-gray-700 text-white placeholder-gray-500 focus:border-[#ff6000]'
                        : 'bg-white border-gray-200 text-[#111111] placeholder-gray-400 focus:border-[#ff6000]'
                    "
                  ></textarea>
                </div>

                <div>
                  <label
                    class="block text-sm font-clash font-medium mb-2"
                    :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                  >
                    Хронические заболевания
                  </label>
                  <textarea
                    v-model="medicalInfo.chronic_diseases"
                    rows="2"
                    placeholder="Укажите хронические заболевания (если есть)"
                    class="w-full px-4 py-3 rounded-xl font-clash text-sm border transition-all"
                    :class="
                      isDark
                        ? 'bg-[#333333] border-gray-700 text-white placeholder-gray-500 focus:border-[#ff6000]'
                        : 'bg-white border-gray-200 text-[#111111] placeholder-gray-400 focus:border-[#ff6000]'
                    "
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-sm font-clash font-medium mb-2"
                      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                    >
                      Рост (см)
                    </label>
                    <input
                      v-model.number="medicalInfo.height"
                      type="number"
                      placeholder="170"
                      min="50"
                      max="250"
                      class="w-full px-4 py-3 rounded-xl font-clash text-sm border transition-all"
                      :class="
                        isDark
                          ? 'bg-[#333333] border-gray-700 text-white placeholder-gray-500 focus:border-[#ff6000]'
                          : 'bg-white border-gray-200 text-[#111111] placeholder-gray-400 focus:border-[#ff6000]'
                      "
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-clash font-medium mb-2"
                      :class="isDark ? 'text-gray-300' : 'text-gray-700'"
                    >
                      Вес (кг)
                    </label>
                    <input
                      v-model.number="medicalInfo.weight"
                      type="number"
                      placeholder="70"
                      min="20"
                      max="300"
                      step="0.1"
                      class="w-full px-4 py-3 rounded-xl font-clash text-sm border transition-all"
                      :class="
                        isDark
                          ? 'bg-[#333333] border-gray-700 text-white placeholder-gray-500 focus:border-[#ff6000]'
                          : 'bg-white border-gray-200 text-[#111111] placeholder-gray-400 focus:border-[#ff6000]'
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="confirmBooking"
              :disabled="!canBook"
              class="w-full px-8 py-4 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-2xl font-clash font-medium text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
            >
              <span v-if="isBooking">Запись...</span>
              <span v-else>Подтвердить запись</span>
            </button>
          </div>
        </div>
      </main>
    </div>

    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="closeSuccessModal"
    >
      <div
        class="rounded-2xl p-8 max-w-md w-full"
        :class="isDark ? 'bg-[#242424]' : 'bg-white'"
        @click.stop
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3
            class="font-clash text-2xl font-bold mb-2"
            :class="isDark ? 'text-white' : 'text-[#111111]'"
          >
            Запись подтверждена!
          </h3>
          <p
            class="font-clash mb-6"
            :class="isDark ? 'text-gray-400' : 'text-gray-600'"
          >
            Вы записаны к врачу {{ doctor?.name }}<br />
            {{ formatDate(selectedDate) }} в {{ formatTime(selectedTime) }}
          </p>
          <button
            @click="closeSuccessModal"
            class="w-full px-6 py-3 bg-gradient-to-r from-[#ff6000] to-[#ff8c42] text-white rounded-xl font-clash font-medium transition-all"
          >
            Отлично
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isDark = ref(true);
const doctor = ref(null);
const loading = ref(true);
const loadingSlots = ref(false);
const isBooking = ref(false);
const showSuccessModal = ref(false);
const errorMessage = ref("");
const slotsError = ref(false);

const selectedDate = ref(null);
const selectedTime = ref(null);
const availableSlots = ref([]);

const medicalInfo = ref({
  complaints: "",
  chronic_diseases: "",
  height: null,
  weight: null,
});

const currentDate = ref(new Date());

const API_URL = "https://medical-backend-54hp.onrender.com/api";

const canBook = computed(() => {
  return (
    selectedDate.value &&
    selectedTime.value &&
    medicalInfo.value.complaints.trim() !== "" &&
    !isBooking.value
  );
});

const currentMonthYear = computed(() => {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return `${
    months[currentDate.value.getMonth()]
  } ${currentDate.value.getFullYear()}`;
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = lastDay.getDate();

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isPast: true,
      isSelected: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    date.setHours(0, 0, 0, 0);
    const isPast = date < today;
    const dateStr = date.toISOString().split("T")[0];

    days.push({
      day: i,
      date: dateStr,
      isCurrentMonth: true,
      isPast,
      isSelected: selectedDate.value === dateStr,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isPast: false,
      isSelected: false,
    });
  }

  return days;
});

const timePeriods = computed(() => {
  const morning = [];
  const afternoon = [];
  const evening = [];

  availableSlots.value.forEach((slot) => {
    const hour = parseInt(slot.split(":")[0]);
    if (hour < 12) morning.push(slot);
    else if (hour < 18) afternoon.push(slot);
    else evening.push(slot);
  });

  return [
    { name: "Утро", slots: morning },
    { name: "День", slots: afternoon },
    { name: "Вечер", slots: evening },
  ];
});

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const selectDate = async (date) => {
  selectedDate.value = date;
  selectedTime.value = null;
  slotsError.value = false;
  await fetchAvailableSlots();
};

const selectTime = (time) => {
  selectedTime.value = time;
};

const fetchDoctor = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const doctorId = route.params.id;
    const res = await fetch(`${API_URL}/doctors/${doctorId}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch doctor (${res.status})`);
    }

    const data = await res.json();
    doctor.value = data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    errorMessage.value = `Не удалось загрузить информацию о враче: ${error.message}`;
  } finally {
    loading.value = false;
  }
};

const fetchAvailableSlots = async () => {
  if (!selectedDate.value || !doctor.value) return;

  loadingSlots.value = true;
  slotsError.value = false;
  errorMessage.value = "";

  try {
    const url = `${API_URL}/appointments/available-slots/${doctor.value.id}?date=${selectedDate.value}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || "Ошибка сервера при загрузке слотов"
      );
    }

    const data = await res.json();
    availableSlots.value = data.availableSlots || [];
  } catch (error) {
    console.error("Error fetching slots:", error);
    slotsError.value = true;
    errorMessage.value =
      "Не удалось загрузить доступные слоты. Попробуйте выбрать другую дату или обновите страницу.";
    availableSlots.value = [];
  } finally {
    loadingSlots.value = false;
  }
};

const confirmBooking = async () => {
  if (!canBook.value) return;

  isBooking.value = true;
  errorMessage.value = "";

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      errorMessage.value = "Пожалуйста, войдите в систему";
      router.push("/login");
      return;
    }

    const res = await fetch(`${API_URL}/appointments/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: doctor.value.id,
        appointment_date: selectedDate.value,
        appointment_time: selectedTime.value,
        complaints: medicalInfo.value.complaints,
        chronic_diseases: medicalInfo.value.chronic_diseases || null,
        height: medicalInfo.value.height || null,
        weight: medicalInfo.value.weight || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при записи");
    }

    showSuccessModal.value = true;
  } catch (error) {
    console.error("Error booking appointment:", error);
    errorMessage.value =
      error.message ||
      "Ошибка при записи на прием. Пожалуйста, попробуйте еще раз.";
  } finally {
    isBooking.value = false;
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.push("/home");
};

const formatTime = (time) => {
  if (!time) return "";
  return time.slice(0, 5);
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
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
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = true;
  }

  fetchDoctor();
});
</script>
