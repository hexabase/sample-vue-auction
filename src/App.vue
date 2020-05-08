<template>
  <v-app>
    <Loading />
    <global-header />
    <v-content>
      <router-view />
    </v-content>
    <global-footer />
  </v-app>
</template>

<script>
import Loading from "@/components/parts/Loading";
import GlobalHeader from "@/components/globals/Header";
import GlobalFooter from "@/components/globals/Footer";

export default {
  name: "App",
  components: {
    Loading,
    GlobalHeader,
    GlobalFooter
  }
};
</script>
