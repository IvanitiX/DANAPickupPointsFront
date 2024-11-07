<template>
  <div v-if="pickupPoint" class="py-8">
    <!-- Back Button -->
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      &larr; Volver
    </button>

    <h1 class="text-3xl font-bold mb-6 text-red-600">{{ pickupPoint.name }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100 lg:order-2">
        <button @click="showReportPopup = true" class="bg-red-600 text-white rounded-lg px-4 py-2 mb-4">
          Reportar
        </button>

        <h2 class="text-xl font-semibold mb-4 text-red-600">Detalles de Ubicación</h2>
        <div class="space-y-2">
          <p class="text-black"><strong class="text-red-500">Calle:</strong> {{ pickupPoint.street }} {{ pickupPoint.number }}</p>
          <p v-if="pickupPoint.floor" class="text-black"><strong class="text-red-500">Piso, puerta... :</strong> {{ pickupPoint.floor }}</p>
          <p class="text-black"><strong class="text-red-500">Ciudad:</strong> {{ pickupPoint.town_data?.name }}</p>
          <p class="text-black"><strong class="text-red-500">Código Postal:</strong> {{ pickupPoint.town_data?.zip_code }}</p>
          <p v-if="pickupPoint.observations" class="mt-4 text-black">
            <strong class="text-red-500">Observaciones:</strong><br>
            {{ pickupPoint.observations }}
          </p>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold mb-2 text-red-600">Horarios</h3>
          <div v-for="(timetable, index) in pickupPoint.timetables" :key="index" class="mb-4">
            <p class="font-medium text-red-500">
              {{ new Date(timetable.start_date).toLocaleDateString('es-ES') }} - 
              {{ new Date(timetable.end_date).toLocaleDateString('es-ES') }}
            </p>
            <ul class="list-disc list-inside text-gray-600">
              <li v-for="(time, timeIndex) in timetable.times" :key="timeIndex">
                {{ time.start_hour.slice(0, 5) }} - {{ time.end_hour.slice(0, 5) }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="h-[600px] lg:order-1">
        <PickupMap 
          :pickup-points="[pickupPoint]"
          :zoom="15"
          :center="pickupPoint.latitude && pickupPoint.longitude ? [pickupPoint.latitude, pickupPoint.longitude] : undefined"
        />
      </div>
    </div>

    <ReportPopup 
          :visible="showReportPopup" 
          :onClose="() => showReportPopup = false"
    />
  </div>
  <div v-else class="py-8">
    <p>Cargando...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../services/api';
import type { PickupPoint } from '../types/pickup';
import PickupMap from '../components/PickupMap.vue';
import ReportPopup from '../components/ReportPopup.vue';

const route = useRoute();
const router = useRouter();
const pickupPoint = ref<PickupPoint | null>(null);
const showReportPopup = ref(false);

const fetchPickupPoint = async () => {
  try {
    const id = parseInt(route.params.id as string);
    pickupPoint.value = await api.getPickupPoint(id);
  } catch (error) {
    console.error('Error fetching pickup point:', error);
  }
};

const goBack = () => {
  router.go(-1); // Go back to the previous page
};

onMounted(fetchPickupPoint);
</script>

<style scoped>
/* Add any specific styles for your Detail view component here */
</style>