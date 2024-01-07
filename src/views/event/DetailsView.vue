<template>
  <div v-if="event">
    <span>@ {{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.description }}</h4>
  </div>
</template>

<script>
export default {
  props: ["event"],
};
</script>

<style></style>
