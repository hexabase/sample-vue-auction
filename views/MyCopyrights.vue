<template>
  <div id="page_myCopyrights" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">保有する楽曲権利</h2>
        </div>
      </div>
    </header>
    <section class="trend">
      <div class="content">
        <h2 class="trend_title">取引の詳細</h2>
        <p class="trend_lead">保有著作権と著作権料をチェックしてください</p>
        <div class="trend_wrap">
          <section class="trend_barChart">
            <h3 class="trend_subTitle">最近5年間の著作権料（1口あたり）</h3>
            <img src="~@/assets/img/auction-detail-graph1.png" alt="" />
          </section>
          <section class="trend_royalty">
            <h3 class="trend_subTitle">
              投資総額
            </h3>
            <dl class="trend_totalList">
              <dt>累積購入金額</dt>
              <dd>500,000 円</dd>
              <dt>累積販売金額</dt>
              <dd>3,000 円</dd>
              <dt>累積著作権料収入</dt>
              <dd>80,000 円</dd>
              <dt>現在保有している著作権の購入額合計</dt>
              <dd>300,000 円</dd>
            </dl>
          </section>
        </div>
      </div>
      <v-tabs hide-slider class="tabMenu">
        <v-tab :to="{ name: 'MyCopyrights' }" class="tabMenu_tabItem">
          保有中
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          販売中
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          オークション中の著作権
        </v-tab>
      </v-tabs>
    </section>
    <section class="myCopyright">
      <div class="content">
        <h2 class="myCopyright_title">保有中の著作権</h2>
        <p class="myCopyright_lead">
          販売したい曲がありましたら、その曲をクリックしてください
        </p>
        <div class="myCopyright_wrap">
          <article
            v-for="(x, index) in displayMyCopyrightsList"
            :key="index"
            class="myCopyright_item"
          >
            <figure class="myCopyright_item_img">
              <img :src="displayMyCopyrightsList[index].image1" />
            </figure>
            <div class="myCopyright_item_content">
              <h3 class="myCopyright_item_title">
                {{ displayMyCopyrightsList[index].タイトル }}
              </h3>
              <p class="myCopyright_item_artist">
                {{ displayMyCopyrightsList[index].歌手1 }}
              </p>
              <p class="myCopyright_item_date">
                保有数：{{ displayMyCopyrightsList[index].数量 }} 口
              </p>
              <button class="button-action" @click="console.log('あとで')">
                販売
              </button>
            </div>
          </article>
          <!-- <article class="myCopyright_item">
            <figure class="myCopyright_item_img">
              <img
                src="https://m.media-amazon.com/images/I/71L4atTJQhL._SS500_.jpg"
              />
            </figure>
            <div class="myCopyright_item_content">
              <h3 class="myCopyright_item_title">
                パラボラ
              </h3>
              <p class="myCopyright_item_artist">
                Officialヒゲ男dism
              </p>
              <p class="myCopyright_item_date">
                保有数：100 口
              </p>
              <button class="button-action" @click="console.log('あとで')">
                販売
              </button>
            </div>
          </article>
          <article class="myCopyright_item">
            <figure class="myCopyright_item_img">
              <img
                src="https://m.media-amazon.com/images/I/71L4atTJQhL._SS500_.jpg"
              />
            </figure>
            <div class="myCopyright_item_content">
              <h3 class="myCopyright_item_title">
                パラボラ
              </h3>
              <p class="myCopyright_item_artist">
                Officialヒゲ男dism
              </p>
              <p class="myCopyright_item_date">
                保有数：100 口
              </p>
              <button class="button-action" @click="console.log('あとで')">
                販売
              </button>
            </div>
          </article> -->
        </div>
        <v-pagination v-model="page" :length="length" @input="pageChange(page)">
        </v-pagination>
      </div>
    </section>
  </div>
</template>
<script>
// import FormCalendar from "../src/components/parts/form/FormCalendar.vue";
export default {
  // components: { FormCalendar },
  data() {
    return {
      page: 1,
      pageSize: 2,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getHexaID"],
      myCopyrightsList: [],
      displayMyCopyrightsList: [],
      auctionList: []
    };
  },
  created: async function() {
    console.log(this.$route.path);
  },
  mounted: async function() {
    this.myCopyrightsList = await this.getMyCopyrightsList();
    this.auctionList = await this.getAuctionList();
    for (const myCopyrightsKey in this.myCopyrightsList) {
      for (const auctionKey in this.auctionList) {
        if (
          this.myCopyrightsList[myCopyrightsKey].著作権番号 ==
          this.auctionList[auctionKey].著作権番号
        ) {
          this.$set(
            this.myCopyrightsList[myCopyrightsKey],
            "タイトル",
            this.auctionList[auctionKey].タイトル
          );
          this.$set(
            this.myCopyrightsList[myCopyrightsKey],
            "歌手1",
            this.auctionList[auctionKey].歌手1
          );
          this.$set(
            this.myCopyrightsList[myCopyrightsKey],
            "image1",
            this.auctionList[auctionKey].image1
          );
        }
      }
    }
    this.length = Math.ceil(this.myCopyrightsList.length / this.pageSize);
    this.displayMyCopyrightsList = this.myCopyrightsList.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },
  methods: {
    async getMyCopyrightsList() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["ユーザ所有著作権一覧"],
        {
          conditions: [
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "楽曲状況", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["保有中"],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true,
          sort_field_id: "取得日付", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "desc"
        }
      );
    },
    async getAuctionList() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["著作権DB"],
        {
          conditions: [],
          page: 1,
          per_page: 9000,
          use_display_id: true,
          sort_field_id: "オークション終了時間", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "asc"
        }
      );
    },
    pageChange(pageNumber) {
      this.displayMyCopyrightsList = this.myCopyrightsList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    }
  }
};
</script>

<style scoped></style>
