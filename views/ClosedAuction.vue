<template>
  <div id="page_closedAuction" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <p class="pageHeader_lead">
            BATONでは音楽著作権を資産にして<br />毎月著作権料を受け取ることができます！
          </p>
        </div>
      </div>
      <!-- <ul class="pageHeader_tab">
        <li class="pageHeader_tabItem-current">取引中オークション</li>
        <li class="pageHeader_tabItem">オークション終了</li>
      </ul> -->
      <v-tabs hide-slider class="tabMenu">
        <v-tab :to="{ name: 'Auctionlist' }" class="tabMenu_tabItem">
          取引中オークション
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          オークション終了
        </v-tab>
      </v-tabs>
    </header>
    <section class="auctionList">
      <h2 class="page_title">終了オークション</h2>
      <p class="auctionList_lead"></p>
      <div class="content">
        <div class="auctionList_wrap">
          <p v-if="displayAuctionList.length < 1" class="auctionList_none">
            現在、終了したオークションはございません
          </p>
          <article
            v-for="(x, index) in displayAuctionList"
            :key="index"
            class="auctionList_item"
            @click="selectItem(displayAuctionList[index].著作権番号)"
          >
            <figure class="auctionList_item_img">
              <img :src="displayAuctionList[index].image1" />
            </figure>
            <h3 class="auctionList_item_title">
              {{ displayAuctionList[index].タイトル }}
            </h3>
            <p class="auctionList_item_artist">
              {{ displayAuctionList[index].歌手1 }}
            </p>
            <p class="auctionList_item_enddate">
              {{ displayAuctionList[index].オークション終了時間 }} 終了
            </p>
          </article>
        </div>
        <v-pagination
          v-if="displayAuctionList.length > 0"
          v-model="page"
          :length="length"
          @input="pageChange(page)"
        ></v-pagination>
      </div>
    </section>
  </div>
</template>
<script>
import moment from "moment-timezone";
import mapping from "@/assets/json/auctionDBMapping.json";
export default {
  data() {
    return {
      page: 1,
      pageSize: 4,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      mapping: JSON.parse(JSON.stringify(mapping)),
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      auctionList: [],
      displayAuctionList: []
    };
  },
  created: async function() {},
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      this.auctionList = await this.getClosedAuctionList();
      this.auctionList = this.auctionList.filter(function(value) {
        const diff = moment(
          moment(value.オークション終了時間)
            .tz("Asia/Tokyo")
            .format()
            .slice(0, -14) + value.オークション終了時刻
        ).diff(moment());
        return diff < 0;
      });
      var auctionBidReport = {};
      auctionBidReport = await this.$hexalink.getPublicReports(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.report.VUE_APP_AUCTIONLISTREPORT_ID,
        {
          conditions: []
        }
      );
      for (const listKey in this.auctionList) {
        const image1Binary = this.auctionList[listKey].image1;
        if (image1Binary) {
          const ab = await this.$hexalink.getPublicFile(
            image1Binary,
            window.env.VUE_APP_WORKSPACE_ID
          );
          const blob = new Blob([ab], { type: "image/jpeg" });
          this.auctionList[listKey].image1 = window.URL.createObjectURL(blob);
        } else {
          this.auctionList[listKey].image1 = "";
        }
        this.auctionList[listKey].オークション終了時間 = moment(
          this.auctionList[listKey].オークション終了時間
        ).format("YYYY年MM月DD日");
        for (const reportKey in auctionBidReport.report_results) {
          if (
            this.auctionList[listKey].著作権番号 ==
            auctionBidReport.report_results[reportKey][
              "ba62cfe6-dcd4-46b7-9028-2ccd73240e52"
            ]
          ) {
            this.$set(
              this.auctionList[listKey],
              "最高入札額",
              auctionBidReport.report_results[reportKey][
                "c68b0a4d-d409-45b2-9ff8-fca331787921"
              ]
            );
            this.$set(
              this.auctionList[listKey],
              "入札数量",
              auctionBidReport.report_results[reportKey][
                "a1101930-fbc0-43eb-8b7c-ae3510f5c989"
              ]
            );
          }
        }
      }
      this.auctionList = this.multiSort(this.auctionList, [
        "オークション終了時間",
        "オークション終了時刻"
      ]);
      this.length = Math.ceil(this.auctionList.length / this.pageSize);
      this.displayAuctionList = this.auctionList.slice(
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
    async getClosedAuctionList() {
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTTABLE_ID,
        {
          conditions: [
            {
              id: "HPに掲載可否", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["掲載する"]
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true,
          sort_field_id: "オークション終了時間", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "desc"
        }
      );
    },
    selectItem(musicId) {
      this.$router.push("/auctionbid/" + musicId);
    },
    pageChange(pageNumber) {
      this.displayAuctionList = this.auctionList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
    defaultSortFunc(a, b, key, direction = -1, nullsFirst = -1) {
      if (a[key] == undefined && b[key] == undefined) return 0;
      if (a[key] == undefined) return nullsFirst * -1;
      if (b[key] == undefined) return nullsFirst * 1;
      if (a[key] > b[key]) return direction * -1;
      if (a[key] < b[key]) return direction * 1;
      return 0;
    },
    multiSort(data, keys) {
      const _data = data.slice();
      _data.sort((a, b) => {
        let order = 0;
        keys.some(key => {
          order = this.defaultSortFunc(a, b, key, 1, 1);
          return !!order;
        });
        return order;
      });
      return _data;
    }
  }
};
</script>

<style scoped></style>
