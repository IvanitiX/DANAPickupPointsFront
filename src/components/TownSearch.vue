<script setup lang="ts">
import { ref, watch } from 'vue';
import { api } from '../services/api';
import type { Town } from '../types/pickup';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const towns = ref<Town[]>([]);
const showDropdown = ref(false);
const isLoading = ref(false);

const debouncedSearch = useDebounceFn(async (query: string) => {
  if (!query.trim()) {
    towns.value = [];
    return;
  }

  isLoading.value = true;
  try {
    towns.value = await api.searchTowns(query);
  } catch (error) {
    console.error('Error searching towns:', error);
    towns.value = [];
  } finally {
    isLoading.value = false;
  }
}, 300);

watch(searchQuery, (newQuery) => {
  showDropdown.value = true;
  debouncedSearch(newQuery);
});

const selectTown = (town: Town) => {
  searchQuery.value = `${town.zip_code} - ${town.name}`;
  emit('update:modelValue', town.id);
  showDropdown.value = false;
};
</script>

<template>
  <div class="relative">
    <input
    v-model="searchQuery"
    type="text"
    placeholder="Buscar ciudad por nombre o código postal..."
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 pl-2 pt-2 pb-2"
  >
    
    <div
      v-if="showDropdown && (towns.length > 0 || isLoading)"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200"
    >
      <div v-if="isLoading" class="p-2 text-gray-500">
        Buscando...
      </div>
      <ul v-else class="py-1">
        <li
          v-for="town in towns"
          :key="town.id"
          @click="selectTown(town)"
          class="px-4 py-2 hover:bg-red-50 cursor-pointer text-black"
        >
          {{ town.zip_code }} - {{ town.name }}
        </li>
      </ul>
    </div>
  </div>
</template>