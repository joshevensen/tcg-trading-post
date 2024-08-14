<script setup lang="ts">
import type { Game } from "~/db/types";

useSeoMeta({
  title: "Admin | TCG Trading Post",
});

const { data, refresh } = await useFetch<{ games: Game[] }>("/api/games");
</script>

<template>
  <div>
    <PageHeader name="Admin" />

    <p v-if="!data?.games.length">No Games Yet</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="game in data.games" :key="game.id">
        <ULink :to="`/admin/games/${game.id}`" active-class="text-primary">{{
          game.name
        }}</ULink>
      </UCard>
    </div>
  </div>
</template>
