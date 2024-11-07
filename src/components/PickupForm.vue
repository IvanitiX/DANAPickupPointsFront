<script setup lang="ts">
import { ref } from 'vue';
import type { PickupPoint } from '../types/pickup';
import { api } from '../services/api';
import TownSearch from './TownSearch.vue';

const emit = defineEmits(['created']);

const form = ref<PickupPoint>({
  name: '',
  observations: '',
  street: '',
  number: '',
  floor: '',
  town: 0,
  timetables: [{
    start_date: '',
    end_date: '',
    times: [{
      start_hour: '10:00:00',
      end_hour: '14:00:00',
      open_all_day: false
    }]
  }]
});

const addTimeSlot = (timetableIndex: number) => {
  form.value.timetables[timetableIndex].times.push({
    start_hour: '',
    end_hour: '',
    open_all_day: false
  });
};

const addTimetable = () => {
  form.value.timetables.push({
    start_date: '',
    end_date: '',
    times: [{
      start_hour: '',
      end_hour: '',
      open_all_day: false
    }]
  });
};

const errorMessage = ref('');

const submitForm = async () => {
  try {
    const response = await api.createPickupPoint(form.value);
    emit('created', response);
    resetForm();
  } catch (error) {
    console.error('Error creating pickup point:', error);
    errorMessage.value = String(error.response?.data) || 'An unexpected error occurred.';
  }
};

const resetForm = () => {
  form.value = {
    name: '',
    observations: '',
    street: '',
    number: '',
    floor: '',
    town: 0,
    timetables: [{
      start_date: '',
      end_date: '',
      times: [{
        start_hour: '10:00:00',
        end_hour: '14:00:00',
        open_all_day: false
      }]
    }]
  };
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
    <div v-if="errorMessage" class="bg-red-600 mb-4">
      {{ errorMessage }}
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-red-600">Nombre</label>
        <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
      </div>

      <div>
        <label class="block text-sm font-medium text-red-600">Observaciones</label>
        <textarea v-model="form.observations" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2"></textarea>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2">
          <label class="block text-sm font-medium text-red-600">Calle</label>
          <input v-model="form.street" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
        </div>
        <div>
          <label class="block text-sm font-medium text-red-600">Número</label>
          <input v-model="form.number" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-red-600">Piso, Puerta ...</label>
        <input v-model="form.floor" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
      </div>

      <div>
        <label class="block text-sm font-medium text-red-600">Ciudad</label>
        <TownSearch v-model="form.town" />
      </div>

      <div v-for="(timetable, tIndex) in form.timetables" :key="tIndex" class="border border-gray-200 p-4 rounded-md">
        <h3 class="font-medium mb-2 text-red-600">Horario {{ tIndex + 1 }}</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-red-600">Fecha Inicio</label>
            <input v-model="timetable.start_date" type="date" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-red-600">Fecha Fin</label>
            <input v-model="timetable.end_date" type="date" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
          </div>
        </div>

        <div v-for="(time, timeIndex) in timetable.times" :key="timeIndex" class="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label class="block text-sm font-medium text-red-600">Hora Inicio</label>
            <input v-model="time.start_hour" type="time" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-red-600">Hora Fin</label>
            <input v-model="time.end_hour" type="time" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 p-2">
          </div>
        </div>

        <button 
          type="button" 
          @click="addTimeSlot(tIndex)" 
          class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Añadir Franja Horaria
        </button>
      </div>

      <button 
        type="button" 
        @click="addTimetable" 
        class="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Añadir Horario
      </button>
    </div>

    <button 
      type="submit" 
      class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Crear Punto de Recogida
    </button>
  </form>
</template>