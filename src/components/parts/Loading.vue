<template>
  <div v-show="isLoading">
    <div class="loader"></div>
    <div class="loader-background"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.getters["common/isLoading"];
    }
  }
};
</script>
