<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { api } from '../services/api';
import type { PickupPoint } from '../types/pickup';
import { useDebounceFn } from '@vueuse/core';
import PickupMap from '../components/PickupMap.vue';
import SearchBar from '../components/SearchBar.vue';
import PageSizeSelector from '../components/PageSizeSelector.vue';
import Pagination from '../components/Pagination.vue';
import PickupCard from '../components/PickupCard.vue';

const pickupPoints = ref<PickupPoint[]>([]);
const searchQuery = ref('');
const totalCount = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isLoading = ref(true);
const error = ref<string | null>(null);

const itemsPerPageOptions = [10, 25, 50];

const fetchPickupPoints = async () => {
  error.value = null;
  isLoading.value = true;
  
  try {
    const offset = (currentPage.value - 1) * itemsPerPage.value;
    const response = await api.getPickupPoints({
      search: searchQuery.value,
      limit: itemsPerPage.value,
      offset,
    });
    pickupPoints.value = response.results || [];
    totalCount.value = response.count || 0;
  } catch (err) {
    console.error('Error fetching pickup points:', err);
    error.value = 'Error al cargar los puntos de recogida';
    pickupPoints.value = [];
    totalCount.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const debouncedFetch = useDebounceFn(fetchPickupPoints, 300);

watch(searchQuery, () => {
  currentPage.value = 1;
  debouncedFetch();
});

watch([currentPage, itemsPerPage], fetchPickupPoints);

const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value));

onMounted(() => {
  fetchPickupPoints();
});
</script>

<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold mb-6 text-red-600">Puntos de Recogida ({{ totalCount }})</h1>

    <div class="mb-6">
      <div class="flex gap-4 items-center mb-4">
        <div class="flex-1">
          <SearchBar v-model="searchQuery" />
        </div>
        <PageSizeSelector
          v-model="itemsPerPage"
          :options="itemsPerPageOptions"
        />
      </div>
    </div>

    <div v-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="isLoading" class="text-center py-8">
      <p class="text-gray-600">Cargando...</p>
    </div>

    <div v-else-if="pickupPoints.length === 0" class="text-center py-8">
      <p class="text-gray-600">No se encontraron puntos de recogida</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <PickupCard
          v-for="point in pickupPoints"
          :key="point.id"
          :point="point"
        />
      </div>

      <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:page="currentPage = $event"
        class="mt-8"
      />
    </div>

    <div class="bg-red-200 mt-5 pt-2 pb-2">
      <p class="text-black flex justify-center">Queridos devs, si tenéis aplicaciones como esta o necesitáis datos, sed libres de contactarme.</p>
      <div class="flex justify-center mt-4 space-x-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <a href="mailto:puntosrecogidadana@protonmail.com" class="text-white underline">
            Contactar con el desarrollador
          </a>
        </button>
      </div>
    </div>

    <div class="mt-8 h-[600px]">
      <PickupMap 
        :pickup-points="pickupPoints || []" 
        :key="pickupPoints.length"
      />
    </div>
    
  </div>
</template>