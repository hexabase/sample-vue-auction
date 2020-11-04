<template>
  <div id="page_news" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">BATON NEWS</h2>
        </div>
      </div>
    </header>
    <section class="news">
      <div class="content">
        <h3 class="news_title">
          プレスリリース
        </h3>
        <div class="news_list">
          <article
            v-for="(news, index) in displayNewsList"
            :key="index"
            class="newsItem"
          >
            <p class="newsItem_date">{{ news.日付 | moment("YYYY.MM.DD") }}</p>
            <h4 class="newsItem_title">{{ news.タイトル }}</h4>
            <div class="newsItem_content">
              <p>
                {{ news.内容 }}
              </p>
            </div>
          </article>
          <v-pagination
            v-model="page"
            :length="length"
            :total-visible="7"
            @input="pageChange"
          ></v-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
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
      length: 0,
      pageSize: 10,
      newsList: [],
      displayNewsList: [],
      mapping: JSON.parse(JSON.stringify(mapping))
    };
  },
  created: async function() {},
  mounted: async function() {
    try {
      this.$store.commit("common/setLoading", true);
      this.newsList = await this.getNewsList();
      this.length = Math.ceil(this.newsList.length / this.pageSize);
      this.displayNewsList = this.newsList.slice(0, this.pageSize);
    } catch (e) {
      console.log(e);
    } finally {
      this.$store.commit("common/setLoading", false);
    }
  },
  methods: {
    async getNewsList() {
      return await this.$hexalink.getPublicItems(
        this.mapping.applicationId,
        this.mapping.table.ニューステーブル,
        {
          page: 1,
          per_page: 0,
          use_display_id: true,
          sort_field_id: "日付",
          sort_order: "asc"
        }
      );
    },
    pageChange: function(pageNumber) {
      this.displayNewsList = this.newsList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
      window.scrollTo({
        top: 190,
        behavior: "smooth"
      });
    }
  }
};
</script>
