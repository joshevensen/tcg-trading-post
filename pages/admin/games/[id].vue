<script setup lang="ts">
import type { Game, Set } from "~/db/types";

useSeoMeta({
  title: "Game | TCG Trading Post",
});

const route = useRoute();
const gameId = route.params.id;

const { data: gameData } = await useFetch<{ game: Game }>(
  `/api/games/${gameId}`
);
const {
  data: setData,
  status,
  refresh,
} = await useFetch<{ sets: Set[] }>(`/api/sets`);

async function importSets() {
  await useFetch(`/api/sets/import?gameId=${gameId}`);
  refresh();
}

async function importCards(setId: string) {
  console.log('import cards')
  await useFetch(`/api/cards/import?gameId=${gameId}&setId=${setId}`);
  refresh();
}
</script>

<template>
  <div>
    <PageHeader :name="gameData!.game.name">
      <UButton @click="importSets" :loading="status === 'pending'">
        Import Sets
      </UButton>
    </PageHeader>

    <p v-if="!setData?.sets.length">No Sets Yet</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="set in setData.sets" :key="set.id">
        <div class="flex justify-between items-center">
          <p>{{ set.name }} <small>({{ set._count.Cards }})</small></p>

          <UButton @click="importCards(set.id)">
            Import Cards
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
