<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="pt-10 pb-2 border-b border-gray-300">
    <h1 class="text-5xl">{{ name }}</h1>
  </div>
</template>
