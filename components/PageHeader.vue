<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="mb-4 pt-1 pb-2 border-b border-gray-300">
    <div class="md:flex md:justify-between md:items-center">
      <h1 class="text-2xl font-medium text-gray-600">{{ name }}</h1>

      <div class="flex gap-4 justify-between md:justify-end mt-2 md:mt-0">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
