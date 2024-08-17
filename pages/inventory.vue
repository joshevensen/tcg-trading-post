<script setup lang="ts">
import type { Card, Faction, Game, Set } from "~/db/types";
import type { SelectOption } from "~/utils/types";

useSeoMeta({
  title: "Inventory | TCG Trading Post",
});

const { data: gamesData } = await useFetch<{ games: Game[] }>(`/api/games`);
const { data: setsData } = await useFetch<{ sets: Set[] }>(`/api/sets`);
const { data: factionsData } = await useFetch<{ factions: Faction[] }>(
  `/api/factions`
);

const sets = setsData.value!.sets;
const factions = factionsData.value!.factions;

const setOptions: SelectOption[] = sets.map((set) => {
  return { label: set.name, value: set.id };
});
const factionOptions: SelectOption[] = factions.map((faction) => {
  return { label: faction.name, value: faction.id };
});
factionOptions.unshift({ label: "All Factions", value: undefined });

const gameId = gamesData.value!.games[0].id;
const setId = ref<string>(setOptions[0].value!);
const factionId = ref<string | undefined>(undefined);

const cards = ref<Card[]>([]);

async function updateCards() {
  const { data: cardsData } = await useFetch<{ cards: Card[] }>(
    `/api/cards?gameId=${gameId}&setId=${setId.value}&factionId=${factionId.value}`
  );

  cards.value = cardsData.value ? cardsData.value.cards : [];
}

await updateCards();
watch(setId, async () => await updateCards());
watch(factionId, async () => await updateCards());
</script>

<template>
  <div>
    <PageHeader name="Inventory">
      <USelect v-model="setId" :options="setOptions"></USelect>
      <USelect v-model="factionId" :options="factionOptions"></USelect>
    </PageHeader>

    <div class="space-y-2">
      <CardInventory v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>
