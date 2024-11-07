<script setup lang="ts">
import PickupForm from '../components/PickupForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleCreated = () => {
  router.push({ name: 'pickup-list' });
};

const goBack = () => {
    router.go(-1); // Go back to the previous page
  };
</script>

<template>
  <div class="py-8">
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      &larr; Volver
    </button>
    
    <h1 class="text-3xl font-bold mb-6 text-red-600">Crear Nuevo Punto de Recogida</h1>
    <div class="max-w-4xl mx-auto">
      <PickupForm @created="handleCreated" />
    </div>
  </div>
</template>