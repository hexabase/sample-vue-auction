<template>
  <header class="siteHeader" role="banner">
    <div class="content">
      <h1 class="siteHeader_logo">
        <router-link to="/">
          <a>
            <img
              src="~@/assets/img/logo.png"
              alt="BATON Marketplace for music royalty"
            />
          </a>
        </router-link>
      </h1>
      <nav class="siteHeader_gnav" role="navigation">
        <ul>
          <li>
            <router-link to="/auctionlist">
              <a
                class="siteHeader_gnav_link"
                :class="{
                  'siteHeader_gnav_link-current':
                    currentPage == 'Auctionlist' ||
                    currentPage == 'ClosedAuction'
                }"
              >
                オークション
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/trade">
              <a class="siteHeader_gnav_link">ユーザー間売買</a>
            </router-link>
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
      <ul v-if="!token" class="siteHeader_userMenu">
        <li>
          <a href="">新規登録</a>
        </li>
        <li>
          <router-link to="/signin">
            <a>ログイン</a>
          </router-link>
        </li>
      </ul>
      <!-- ログイン時 -->
      <template v-if="token">
        <v-menu offset-y class="siteHeader_userInfo">
          <template v-slot:activator="{ on }">
            <button class="siteHeader_userName" v-on="on">
              <v-icon>mdi-chevron-right</v-icon>
              {{ userName }}
            </button>
          </template>
          <ul class="siteHeader_loginMenu">
            <li>
              <router-link to="mypage">
                <a>マイページ</a>
              </router-link>
            </li>
            <li>
              <router-link to="mypage">
                <a>登録情報の変更</a>
              </router-link>
            </li>
            <li class="break">
              <button @click="signout">ログアウト</button>
            </li>
          </ul>
        </v-menu>
      </template>
    </div>
    <div v-if="token" class="siteHeader_userNav">
      <ul class="siteHeader_userNav_wrap">
        <li>
          <router-link to="/mypage">
            <a
              class="siteHeader_userNav_link"
              :class="{
                'siteHeader_userNav_link-current': currentPage == 'Mypage'
              }"
            >
              マイページ
            </a>
          </router-link>
        </li>
        <li>
          <a href="" class="siteHeader_userNav_link">お知らせ</a>
        </li>
        <li>
          <router-link to="/mycopyrights">
            <a
              class="siteHeader_userNav_link"
              :class="{
                'siteHeader_userNav_link-current': currentPage == 'MyCopyrights'
              }"
            >
              保有する楽曲権利
            </a>
          </router-link>
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
      token: this.$store.getters["auth/getToken"],
      currentPage: "",
      userName: ""
    };
  },
  watch: {
    $route(to, from) {
      this.token = this.$store.getters["auth/getToken"];
      this.userName = this.$store.getters["auth/getUserNameKanji"];
    }
  },
  created: async function() {
    this.currentPage = this.$route.name || "";
    this.userName = this.$store.getters["auth/getUserNameKanji"];
  },
  methods: {
    async signout() {
      // store 初期化
      await this.$hexalink.logout(this.token);
      this.$store.commit("auth/stateInit");
      this.$store.commit("datas/stateInit");
      this.$router.push("/signin");
    }
  }
};
</script>
