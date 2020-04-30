<template>
  <v-row>
    <v-btn absolute right @click="signout">ログアウト</v-btn>
    <v-col>
      <p class="text-center">
        宇久島メガソーラープロジェクト
        <br />土地情報管理データベース
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    async signout() {
      // store 初期化
      const token = this.$store.getters["auth/getToken"];
      await this.$hexalink.logout(token);
      this.$store.commit("auth/stateInit");
      this.$store.commit("datas/stateInit");
      this.$router.push("/signin");
    }
  }
};
</script>
