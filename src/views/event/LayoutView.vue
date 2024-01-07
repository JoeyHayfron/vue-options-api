<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div>
      <RouterLink :to="{ name: 'event-details' }">Details</RouterLink> |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </div>
    <RouterView :event="GStore.event" />
  </div>
</template>

<script>
export default {
  inject: ["GStore"],
};
</script>
