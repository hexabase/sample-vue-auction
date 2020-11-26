<template>
  <div id="page_news" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">BATON NEWS</h2>
        </div>
      </div>
    </header>
    <section id="news11" class="news">
      <div class="content">
        <h3 class="news_title">
          プレスリリース
        </h3>
        <div class="news_list">
          <article
            v-for="(news, index) in displayNewsList"
            :key="index"
            :id="`news${index}`"
            class="newsItem"
          >
            <p class="newsItem_date">
              {{ displayNewsList[index].日付 | moment("YYYY.MM.DD") }}
            </p>
            <h4 class="newsItem_title">
              {{ displayNewsList[index].タイトル }}
            </h4>
            <div class="newsItem_content">
              <div v-html="displayNewsList[index].内容"></div>
            </div>
          </article>
          <v-pagination
            v-model="page"
            :length="length"
            :total-visible="7"
            @input="pageChange"
          ></v-pagination>
        </div>
        <!-- <v-pagination
          v-if="displayNewsList.length > 0"
          v-model="page"
          :length="length"
          @input="pageChange(page)"
        ></v-pagination> -->
      </div>
    </section>
  </div>
</template>
<script>
import marked from "marked";
import mapping from "@/assets/json/auctionDBMapping.json";
import moment from "moment-timezone";

export default {
  filters: {
    moment(value, format) {
      return moment(value)
        .tz("Asia/Tokyo")
        .format(format);
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 4,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      mapping: JSON.parse(JSON.stringify(mapping)),
      newsList: [],
      displayNewsList: []
    };
  },
  created: async function() {},
  mounted: async function() {
    try {
      console.log(window.env.table.VUE_APP_AUCTIONBIDTABLE_ID);
      this.$store.commit("common/setLoading", true);
      this.newsList = await this.getNewsList();
      this.length = Math.ceil(this.newsList.length / this.pageSize);
      for (const key in this.newsList) {
        this.newsList[key].内容 = marked(this.newsList[key].内容);
      }
      this.displayNewsList = this.newsList.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
      );
    } catch (e) {
      console.log(e);
    } finally {
      this.$store.commit("common/setLoading", false);
    }
  },
  updated() {
    const hash = this.$route.hash;
    if (hash && hash.match(/^#.+$/)) {
      this.scrollToHash(hash);
    }
  },
  methods: {
    pageChange(pageNumber) {
      this.displayNewsList = this.newsList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    async getNewsList() {
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_NEWSTABLE_ID,
        {
          conditions: [],
          page: 1,
          per_page: 9000,
          use_display_id: true,
          sort_field_id: "日付", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "desc"
        }
      );
      // return await this.$hexalink.getItems(
      //   this.token,
      //   window.env.VUE_APP_APPLICATION_ID,
      //   window.env.table.VUE_APP_NEWSTABLE_ID,
      //   {
      //     conditions: [],
      //     page: 1,
      //     per_page: 9000,
      //     use_display_id: true,
      //     sort_field_id: "日付", // Hexalink画⾯で⼊⼒したIDを指定
      //     sort_order: "desc"
      //   }
      // );
    },
    scrollToHash(hash) {
      let hashName = hash.replace("#", "");
      let elmPosi = document.getElementById(hashName).getBoundingClientRect();
      let headerHeight = window.innerWidth < 800 ? 80 : 150;
      let hashY = elmPosi.top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: hashY,
        behavior: "smooth"
      });
    }
  }
};
</script>
