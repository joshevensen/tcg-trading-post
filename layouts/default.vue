<script setup lang="ts">
const links = [
  [
    {
      label: "Have",
      to: "/have",
    },
    {
      label: "Want",
      to: "/want",
    },
    {
      label: "Trade",
      to: "/trade",
    },
    {
      label: "Inventory",
      to: "/inventory",
    },
  ],
  [
    {
      label: "Admin",
      to: "/admin",
    },
  ],
];
</script>

<template>
  <UContainer>
    <header class="flex justify-between items-center py-2">
      <p class="text-lg font-bold text-primary">
        <ULink to="/">TCG Trading Post</ULink>
      </p>

      <UPopover>
        <UButton
          icon="i-heroicons-bars-3"
          size="sm"
          color="primary"
          variant="solid"
          class="md:hidden"
        />

        <template #panel>
          <UVerticalNavigation :links="links" />
        </template>
      </UPopover>

      <nav class="hidden md:flex gap-4">
        <UHorizontalNavigation :links="links" />
      </nav>
    </header>

    <main class="pt-4 pb-10">
      <slot />
    </main>
  </UContainer>
</template>
