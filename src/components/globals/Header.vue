<template>
  <header class="siteHeader" role="banner">
    <div class="content">
      <h1 class="siteHeader_logo">
        <a href="/">BATON</a>
      </h1>
      <nav class="siteHeader_gnav" role="navigation">
        <ul>
          <li class="siteHeader_gnav-link">
            <a href="/auctionbid">オークション</a>
          </li>
          <li class="siteHeader_gnav-link">
            <a href="/trade">ユーザー間売買</a>
          </li>
          <li class="siteHeader_gnav-link">
            <a href="">楽曲一覧</a>
          </li>
          <li class="siteHeader_gnav-link">
            <a href="">BATONについて</a>
          </li>
          <li class="siteHeader_gnav-link">
            <a href="">Q&A</a>
          </li>
        </ul>
      </nav>
      <ul class="siteHeader_userMenu">
        <li>
          <a href="">新規登録</a>
        </li>
        <li>
          <a href="">ログイン</a>
        </li>
      </ul>
    </div>
    <a class="menu-trigger" href="#">
      <span></span><span></span><span></span>
    </a>
    <v-btn absolute right @click="signout">ログアウト</v-btn>
  </header>
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
