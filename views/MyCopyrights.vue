<template>
  <div id="page_myCopyrights" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">落札した商品</h2>
        </div>
      </div>
      <v-tabs hide-slider class="tabMenu">
        <v-tab :to="{ name: 'MyCopyrights' }" class="tabMenu_tabItem">
          落札済み
        </v-tab>
        <!-- <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          販売中
        </v-tab> -->
        <v-tab :to="{ name: 'MyBidAuction' }" class="tabMenu_tabItem">
          オークション中の商品
        </v-tab>
      </v-tabs>
    </header>
    <!-- <section class="trend">
    </section> -->
    <section class="myCopyright">
      <div class="content">
        <h2 class="myCopyright_title">落札した商品</h2>
        <!-- <p class="myCopyright_lead">
          販売したい曲がありましたら、<br class="show-mobile" />
          その曲をクリックしてください
        </p> -->
        <div class="myCopyright_wrap">
          <article
            v-for="(x, index) in displayMyCopyrightsList"
            :key="index"
            class="myCopyright_item"
          >
            <figure
              class="myCopyright_item_img"
              @click="selectItem(displayMyCopyrightsList[index].著作権番号)"
            >
              <img :src="displayMyCopyrightsList[index].image1" />
            </figure>
            <div
              class="myCopyright_item_content"
              @click="selectItem(displayMyCopyrightsList[index].著作権番号)"
            >
              <h3 class="myCopyright_item_title">
                {{ displayMyCopyrightsList[index].タイトル }}
              </h3>
              <p class="myCopyright_item_artist">
                {{ displayMyCopyrightsList[index].歌手1 }}
              </p>
              <p class="myCopyright_item_date">
                保有数：{{ displayMyCopyrightsList[index].数量 }} 口
              </p>
              <!-- <button class="button-action" @click="console.log('あとで')">
                販売
              </button> -->
            </div>
          </article>
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
      pageSize: 6,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      myCopyrightsList: {},
      displayMyCopyrightsList: {},
      myBidAuctionList: {},
      displayMyBidAuctionList: {},
      auctionList: []
    };
  },
  created: async function() {
    console.log(this.$route.path);
  },
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      // 保有中の楽曲
      this.myCopyrightsList = await this.getMyCopyrightsList();
      for (const myCopyrightskey in this.myCopyrightsList) {
        const myAuctionList = await this.getAuctionList(
          this.myCopyrightsList[myCopyrightskey].著作権番号
        );

        const image1Binary = myAuctionList[0].image1;
        if (image1Binary) {
          const ab = await this.$hexalink.getFile(this.token, image1Binary);
          const blob = new Blob([ab], { type: "image/jpeg" });
          myAuctionList[0].image1 = window.URL.createObjectURL(blob);
        } else {
          myAuctionList[0].image1 = "";
        }

        this.myCopyrightsList[myCopyrightskey].image1 = myAuctionList[0].image1;
        this.myCopyrightsList[myCopyrightskey].タイトル =
          myAuctionList[0].タイトル;
        this.myCopyrightsList[myCopyrightskey].歌手1 = myAuctionList[0].歌手1;
      }
      this.length = Math.ceil(this.myCopyrightsList.length / this.pageSize);
      this.displayMyCopyrightsList = this.myCopyrightsList.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
      );
    } catch (e) {
      console.log(e);
      this.$store.commit("auth/stateInit");
      this.$store.commit("datas/stateInit");
      this.$store.commit("user/stateInit");
      this.$router.push("/signin");
    } finally {
      // loading overlay非表示
      this.$store.commit("common/setLoading", false);
    }
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
    async getBidAuctionList() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["オークション入札状況DB"],
        {
          conditions: [
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "落札状況", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["入札"],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true,
          sort_field_id: "入札時間", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "desc"
        }
      );
    },
    async getAuctionList(musicId) {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["著作権DB"],
        {
          conditions: [
            {
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [musicId],
              exact_match: true // 完全⼀致で検索
            }
          ],
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
    },
    selectItem(musicId) {
      this.$router.push("/auctionbid/" + musicId);
    }
  }
};
</script>

<style scoped></style>
