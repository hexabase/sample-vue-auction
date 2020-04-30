<template>
  <v-app>
    <Loading />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Loading from "@/components/parts/Loading";
export default {
  name: "App",
  components: {
    Loading
  }
};
</script>
