<script setup lang="ts">
import type { PickupPoint } from '../types/pickup';

defineProps<{
  point: PickupPoint;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'pickup-detail', params: { id: point.id }}"
    class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-red-200"
  >
    <h2 class="text-xl font-semibold mb-2 text-red-600">{{ point.name }}</h2>
    <p class="text-gray-600">{{ point.street }} {{ point.number }}</p>
    <p class="text-gray-600">{{ point.town_data?.name }}</p>
    
    <div class="mt-4">
      <h3 class="font-medium mb-2 text-red-500">Horarios:</h3>
      <div v-for="(timetable, index) in point.timetables" :key="index" class="mb-2">
        <p class="text-sm text-black">
          {{ new Date(timetable.start_date).toLocaleDateString('es-ES') }} - 
          {{ new Date(timetable.end_date).toLocaleDateString('es-ES') }}
        </p>
        <ul class="text-sm text-gray-600">
          <li v-for="(time, timeIndex) in timetable.times" :key="timeIndex">
            <span v-if="time.start_hour && time.end_hour">{{ time.start_hour.slice(0, 5) }} - {{ time.end_hour.slice(0, 5) }}</span>
            <span v-if="time.open_all_day && time.open_all_day == true">Abierto todo el día</span>
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>