<template>
  <UContainer>
    <header class="flex justify-between items-center py-2">
      <p>TCG Trading Post</p>

      <nav class="flex gap-4">
        <ULink to="/" active-class="text-primary">Home</ULink>
        <ULink to="/admin" active-class="text-primary">Admin</ULink>
      </nav>
    </header>

    <slot />
  </UContainer>
</template>
