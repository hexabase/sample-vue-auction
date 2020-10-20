<template>
  <div id="page_myBidAuction" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">保有する楽曲権利</h2>
        </div>
      </div>
    </header>
    <section class="trend">
      <v-tabs hide-slider class="tabMenu">
        <v-tab :to="{ name: 'MyCopyrights' }" class="tabMenu_tabItem">
          保有中
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          販売中
        </v-tab>
        <v-tab :to="{ name: 'MyBidAuction' }" class="tabMenu_tabItem">
          オークション中の著作権
        </v-tab>
      </v-tabs>
    </section>
    <section class="myBidAuction">
      <div class="content">
        <h2 class="myBidAuction_title">オークション中の著作権</h2>
        <p class="myBidAuction_lead">
          オークション入札中のものがあれば、<br class="show-mobile" />
          その曲をクリックしてください
        </p>
        <div class="myBidAuction_wrap">
          <article
            v-for="(x, index) in displayMyBidAuctionList"
            :key="index"
            class="myBidAuction_item"
          >
            <figure class="myBidAuction_item_img">
              <img :src="displayMyBidAuctionList[index].image1" />
            </figure>
            <div class="myBidAuction_item_content">
              <h3 class="myBidAuction_item_title">
                {{ displayMyBidAuctionList[index].タイトル }}
              </h3>
              <p class="myBidAuction_item_artist">
                {{ displayMyBidAuctionList[index].歌手1 }}
              </p>
              <p class="myBidAuction_item_date">
                保有数：{{ displayMyBidAuctionList[index].数量 }} 口
              </p>
              <button
                class="button-action"
                @click="selectItem(displayMyBidAuctionList[index].著作権番号)"
              >
                確認
              </button>
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
      // 入札中オークション
      this.myBidAuctionList = await this.getBidAuctionList();
      for (const myBidAuctionListkey in this.myBidAuctionList) {
        const myAuctionList = await this.getAuctionList(
          this.myBidAuctionList[myBidAuctionListkey].著作権番号
        );

        const image1Binary = myAuctionList[0].image1;
        if (image1Binary) {
          const ab = await this.$hexalink.getFile(this.token, image1Binary);
          const blob = new Blob([ab], { type: "image/jpeg" });
          myAuctionList[0].image1 = window.URL.createObjectURL(blob);
        } else {
          myAuctionList[0].image1 = "";
        }

        this.myBidAuctionList[myBidAuctionListkey].image1 =
          myAuctionList[0].image1;
        this.myBidAuctionList[myBidAuctionListkey].タイトル =
          myAuctionList[0].タイトル;
        this.myBidAuctionList[myBidAuctionListkey].歌手1 =
          myAuctionList[0].歌手1;
      }
      this.length = Math.ceil(this.myBidAuctionList.length / this.pageSize);
      this.displayMyBidAuctionList = this.myBidAuctionList.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
      );
    } catch (e) {
      console.log(e);
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
