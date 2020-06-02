<template>
  <header class="siteHeader" role="banner">
    <div class="content">
      <h1 class="siteHeader_logo">
        <a href="/">
          <img
            src="~@/assets/img/logo.png"
            alt="BATON Marketplace for music royalty"
          />
        </a>
      </h1>
      <nav class="siteHeader_gnav" role="navigation">
        <ul>
          <li>
            <a
              href="/auctionlist"
              class="siteHeader_gnav_link"
              :class="{
                'siteHeader_gnav_link-current':
                  currentPage == 'Auctionlist' || currentPage == 'ClosedAuction'
              }"
            >
              オークション
            </a>
          </li>
          <li>
            <a href="/trade" class="siteHeader_gnav_link">ユーザー間売買</a>
          </li>
          <li>
            <a href="" class="siteHeader_gnav_link">楽曲一覧</a>
          </li>
          <li>
            <a href="" class="siteHeader_gnav_link">BATONについて</a>
          </li>
          <li>
            <a href="" class="siteHeader_gnav_link">Q&amp;A</a>
          </li>
        </ul>
      </nav>
      <!-- ログアウト時 -->
      <ul v-if="false" class="siteHeader_userMenu">
        <li>
          <a href="">新規登録</a>
        </li>
        <li>
          <a href="/login">ログイン</a>
        </li>
      </ul>
      <!-- ログイン時 -->
      <v-menu offset-y class="siteHeader_userInfo">
        <template v-slot:activator="{ on }">
          <button class="siteHeader_userName" v-on="on">
            <v-icon>mdi-chevron-right</v-icon>
            山田 花子
          </button>
        </template>
        <ul class="siteHeader_loginMenu">
          <li>
            <a href="mypage">マイページ</a>
          </li>
          <li>
            <a href="mypage">登録情報の変更</a>
          </li>
          <li class="break">
            <button @click="signout">ログアウト</button>
          </li>
        </ul>
      </v-menu>
    </div>
    <div class="siteHeader_userNav">
      <ul class="siteHeader_userNav_wrap">
        <li>
          <a
            href="/mypage"
            class="siteHeader_userNav_link"
            :class="{
              'siteHeader_userNav_link-current': currentPage == 'Mypage'
            }"
          >
            マイページ
          </a>
        </li>
        <li>
          <a href="" class="siteHeader_userNav_link">お知らせ</a>
        </li>
        <li>
          <a
            href="/mycopyrights"
            class="siteHeader_userNav_link"
            :class="{
              'siteHeader_userNav_link-current': currentPage == 'MyCopyrights'
            }"
          >
            保有する楽曲権利
          </a>
        </li>
        <li>
          <a href="" class="siteHeader_userNav_link">お財布</a>
        </li>
        <li>
          <a href="" class="siteHeader_userNav_link">ユーザー情報</a>
        </li>
      </ul>
    </div>
    <a class="menu-trigger" href="#">
      <span></span><span></span><span></span>
    </a>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currentPage: ""
    };
  },
  created: async function() {
    this.currentPage = this.$route.name || "";
  },
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
