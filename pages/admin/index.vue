<script setup lang="ts">
useSeoMeta({
  title: "Admin | TCG Trading Post",
});
</script>

<template>
  <div>
    <h1>Admin</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <UCard>
        <ULink to="/admin/lorcana" active-class="text-primary">Lorcana</ULink>
      </UCard>
    </div>
  </div>
</template>
