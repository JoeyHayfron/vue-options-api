<template>
  <div v-if="event">
    <p>Edit event here</p>
  </div>
</template>

<script>
export default {
  props: ["event"],
};
</script>
