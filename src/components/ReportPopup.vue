<template>
  <div class="overlay" v-if="visible">
    <div class="popup">
      <div class="title-bar">
        <h2 class="title">Reportar un Problema</h2>
        <button @click="close" class="close-button" aria-label="Close">
          &times; <!-- You can replace this with an SVG or icon from a library -->
        </button>
      </div>
      <form class="mb-2 mt-1 ml-3 mr-3" @submit.prevent="submitReport">
        <div class="mb-4">
          <label class="block text-gray-700">Descripción:</label>
          <textarea v-model="form.description" class="w-full border rounded-lg p-2" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-2 text-gray-500">Cancelar</button>
          <button type="submit" class="bg-red-600 text-white rounded-lg px-4 py-2">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Report } from '../types/pickup';
import { api } from '../services/api';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['created']);

const form = ref<Report>({
  description: ''
});

const close = () => {
  form.value = {
    description: ''
  };
  props.onClose();
};

const submitReport = async () => {
  try {
    const response = await api.createReport(form.value);
    emit('created', response);
    resetForm();
  } catch (error) {
    console.error('Error creating report:', error);
  }
  close();
};

const resetForm = () => {
  form.value = {
    description : '',
  };
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 999; /* Below the popup */
}
.popup {
  position: absolute; /* or fixed */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Ensure it's on top */
  background: white; /* Background for the popup */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%; /* You can adjust the width */
  max-width: 500px; /* Max width for the popup */
}
.title-bar {
  background-color: #e53e3e; /* Tailwind's red-600 */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 0; /* Remove padding from the title bar */
}
.title {
  margin: 0;
  font-size: 1.25rem; /* Adjust size as needed */
  padding-left: 10px;
}
.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem; /* Adjust size as needed */
  cursor: pointer;
  padding-right: 10px;
}
</style>