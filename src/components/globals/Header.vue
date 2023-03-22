<template>
  <header
    class="siteHeader"
    :class="{
      'siteHeader-login': token,
      'menu-open': isMenuOpen,
      topOfPage: isPagetop
    }"
    role="banner"
  >
    <div class="content">
      <h1 class="siteHeader_logo">
        <router-link to="/">
          <img
            src="~@/assets/img/logo.png"
            alt="Hexabid Marketplace for music royalty"
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
          <!-- <li>
            <router-link to="/trade">
              ユーザー間売買
            </router-link>
          </li> -->
          <!-- <li>
            <a href="" class="siteHeader_gnav_link">楽曲一覧</a>
          </li> -->
          <li>
            <!-- <router-link
              :to="{
                path: '/',
                hash: '#about'
              }"
            > -->
            <a @click="gotoAbout">
              Hexabidについて
            </a>
            <!-- </router-link> -->
          </li>
          <li>
            <router-link to="/faq">
              Q&amp;A
            </router-link>
          </li>
        </ul>
        <ul v-if="token" class="siteHeader_userNav-tablet">
          <li>
            <router-link to="/mypage">
              マイページ
            </router-link>
          </li>
          <!-- <li>
            <a href="">お知らせ</a>
          </li> -->
          <li>
            <router-link to="/mycopyrights">
              落札した商品
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/wallet">
              お財布
            </router-link>
          </li> -->
          <li>
            <router-link to="/userinfo">
              ユーザー情報
            </router-link>
          </li>
          <li>
            <button @click="signout">ログアウト</button>
          </li>
        </ul>
        <ul v-if="!token" class="siteHeader_userNav-tablet">
          <li>
            <router-link to="/registration">
              新規登録
            </router-link>
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
          <router-link to="/registration">
            新規登録
          </router-link>
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
              <v-tooltip v-if="!approvedFlag" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span class="mark-alert" v-bind="attrs" v-on="on"></span>
                </template>
                <span>【未登録】入札にはユーザー情報の登録が必要です</span>
              </v-tooltip>
            </button>
          </template>
          <ul class="siteHeader_loginMenu">
            <li>
              <router-link to="mypage">
                マイページ
              </router-link>
            </li>
            <li>
              <router-link to="userinfo">
                ユーザー情報
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
        <!-- <li>
          <a href="">お知らせ</a>
        </li> -->
        <li>
          <router-link to="/mycopyrights">
            落札した商品
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/wallet">
            お財布
          </router-link>
        </li> -->
        <li>
          <router-link to="/userinfo">
            ユーザー情報
          </router-link>
        </li>
      </ul>
    </div>
    <button class="menu-trigger" @click="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </header>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      currentPage: "",
      userName: "",
      isMenuOpen: false,
      isPagetop: true,
      userInfo: [],
      approvedFlag: false
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
  mounted: async function() {
    window.addEventListener("scroll", _.throttle(this.calculateScrollY, 250), {
      passive: true
    });
    try {
      this.userInfo = await this.getUserInfo();
      if (this.userInfo && this.userInfo.length > 0) {
        this.approvedFlag = this.userInfo[0]["ステータス"] ? true : false;
      }
    } catch (e) {
      console.log(e);
    }
  },
  beforeDestroy() {
    window.removeEventListener(
      "scroll",
      _.throttle(this.calculateScrollY, 250),
      { passive: true }
    );
  },
  methods: {
    async signout() {
      // store 初期化
      this.$store.commit("auth/stateInit");
      this.$store.commit("auth/setToken", "");
      this.$store.commit("datas/stateInit");
      this.$store.commit("user/stateInit");
      this.$router.push("/signin");
      await this.$hexalink.logout(this.token);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    calculateScrollY() {
      var scrollY = window.scrollY;
      this.isPagetop = scrollY == 0 ? true : false;
    },
    gotoAbout() {
      if (this.$route.name === "top") {
        let elmPosi = document.getElementById("about").getBoundingClientRect();
        let headerHeight = window.innerWidth < 800 ? 60 : 80;
        let hashY = elmPosi.top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: hashY,
          behavior: "smooth"
        });
      }
      this.$router.push("/#about");
      this.toggleMenu();
    },
    async getUserInfo() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["ユーザDB"],
        {
          conditions: [
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 1,
          use_display_id: true
        }
      );
    }
  }
};
</script>
