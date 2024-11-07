<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: 'update:page', page: number): void;
}>();
</script>

<template>
  <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('update:page', page)"
      :class="[
        'px-4 py-2 rounded-md',
        currentPage === page
          ? 'bg-red-600 text-white'
          : 'bg-white text-red-600 hover:bg-red-50'
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>