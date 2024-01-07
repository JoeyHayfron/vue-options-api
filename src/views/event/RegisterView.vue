<template>
  <div v-if="event">
    <p>Register for event here</p>
    <button @click="register">Register</button>
  </div>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      this.GStore.flashMessage = "Registration successful";

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.push({ name: "event-details" });
    },
  },
};
</script>
