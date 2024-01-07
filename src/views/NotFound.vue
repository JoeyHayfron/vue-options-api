<template>
  <h1>Ooops</h1>
  <p>{{ props.resource }} not found</p>
</template>

<script>
export default {
  props: ["resource"],
};
</script>
