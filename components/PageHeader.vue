<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="mb-8 py-2 border-b border-gray-300">
    <div class="flex justify-between items-center">
      <h1 class="text-5xl">{{ name }}</h1>

      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
