<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    type="text"
    placeholder="Buscar puntos de recogida..."
    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
  >
</template>