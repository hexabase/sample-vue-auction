<template>
  <header class="siteHeader" :class="{'siteHeader-login': token, 'menu-open': isMenuOpen}" role="banner">
    <div class="content">
      <h1 class="siteHeader_logo">
        <router-link to="/">
          <img
            src="~@/assets/img/logo.png"
            alt="BATON Marketplace for music royalty"
          />
        </router-link>
      </h1>
      <nav class="siteHeader_gnav" role="navigation">
        <ul>
          <li class="show-tab">
            <router-link to="/">
              HOME
            </router-link>
          </li>
          <li>
            <router-link to="/auctionlist">
              オークション
            </router-link>
          </li>
          <li>
            <router-link to="/trade">
              ユーザー間売買
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
        <ul v-if="token" class="siteHeader_userNav-tablet">
          <li>
            <router-link to="/mypage">
              マイページ
            </router-link>
          </li>
          <li>
            <a href="">お知らせ</a>
          </li>
          <li>
            <router-link to="/mycopyrights">
              保有する楽曲権利
            </router-link>
          </li>
          <li>
            <a href="">お財布</a>
          </li>
          <li>
            <a href="">ユーザー情報</a>
          </li>
          <li>
            <button @click="signout">ログアウト</button>
          </li>
        </ul>
        <ul v-if="!token" class="siteHeader_userNav-tablet">
          <li>
            <a href="">新規登録</a>
          </li>
          <li>
            <router-link to="/signin">
              ログイン
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- ログアウト時 -->
      <ul v-if="!token" class="siteHeader_userMenu">
        <li>
          <a href="">新規登録</a>
        </li>
        <li class="hide-tab">
          <router-link to="/signin">
            ログイン
          </router-link>
        </li>
      </ul>
      <!-- ログイン時 -->
      <template v-if="token">
        <v-menu offset-y class="siteHeader_userInfo">
          <template v-slot:activator="{ on }">
            <button class="siteHeader_userName hide-tab" v-on="on">
              <v-icon>mdi-chevron-right</v-icon>
              {{ userName }}
            </button>
          </template>
          <ul class="siteHeader_loginMenu">
            <li>
              <router-link to="mypage">
                マイページ
              </router-link>
            </li>
            <li>
              <router-link to="mypage">
                登録情報の変更
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
            マイページ
          </router-link>
        </li>
        <li>
          <a href="">お知らせ</a>
        </li>
        <li>
          <router-link to="/mycopyrights">
            保有する楽曲権利
          </router-link>
        </li>
        <li>
          <a href="">お財布</a>
        </li>
        <li>
          <a href="">ユーザー情報</a>
        </li>
      </ul>
    </div>
    <button class="menu-trigger" @click="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      currentPage: "",
      userName: "",
      isMenuOpen: false
    };
  },
  watch: {
    $route(to, from) {
      this.token = this.$store.getters["auth/getToken"];
      this.userName = this.$store.getters["auth/getUserNameKanji"];
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
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
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>
