<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  options: number[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-gray-600">Mostrar:</span>
    <select
      :value="props.modelValue"
      @change="$emit('update:modelValue', Number(($event.target as HTMLSelectElement).value))"
      class="px-3 py-2 rounded-lg border border-gray-300 focus:border-red-300 focus:ring focus:ring-red-200"
    >
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>