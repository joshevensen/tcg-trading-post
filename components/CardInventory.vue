<script setup lang="ts">
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

let borderColor = "border-gray-500";
let backgroundColor = "bg-gray-500/10";

switch (props.card.Faction.name) {
  case "Amber":
    borderColor = "border-lorcanaAmber";
    backgroundColor = "bg-lorcanaAmber/10";
    break;
  case "Amethyst":
    borderColor = "border-lorcanaAmethyst";
    backgroundColor = "bg-lorcanaAmethyst/10";
    break;
  case "Emerald":
    borderColor = "border-lorcanaEmerald";
    backgroundColor = "bg-lorcanaEmerald/10";
    break;
  case "Ruby":
    borderColor = "border-lorcanaRuby";
    backgroundColor = "bg-lorcanaRuby/10";
    break;
  case "Sapphire":
    borderColor = "border-lorcanaSapphire";
    backgroundColor = "bg-lorcanaSapphire/10";
    break;
  case "Steel":
    borderColor = "border-lorcanaSteel";
    backgroundColor = "bg-lorcanaSteel/10";
    break;
}
</script>

<template>
  <div :class="`p-2 border-l-4 rounded-l-lg ${borderColor} ${backgroundColor}`">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg">{{ card.name }}</h3>
        <p class="text-sm text-gray-500">
          {{ card.number }} &middot; {{ card.Set?.name }} &middot;
          {{ card.Faction?.name }}
        </p>
      </div>

      <UButton>Add</UButton>
    </div>
  </div>
</template>
