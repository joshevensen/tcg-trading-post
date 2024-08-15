<script setup lang="ts">
import type { Game } from "~/db/types";

useSeoMeta({
  title: "Inventory | TCG Trading Post",
});

const { data: gamesData } = await useFetch<{ games: Game[] }>(`/api/games`);
const gameOptions = gamesData.value!.games.map((game) => game.name);

const game = ref(gameOptions[0]);
</script>

<template>
  <div>
    <PageHeader name="Inventory" />

    <USelect v-model="game" :options="gameOptions"></USelect>
  </div>
</template>
