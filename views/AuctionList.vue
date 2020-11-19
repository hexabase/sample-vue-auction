<template>
  <div id="page_auctionlist" data-role="page">
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
        <v-tab
          :to="{ name: 'Auctionlist' }"
          class="tabMenu_tabItem v-tab--active"
        >
          取引中オークション
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          オークション終了
        </v-tab>
      </v-tabs>
    </header>
    <section class="auctionList">
      <h2 class="page_title">取引中オークション</h2>
      <p class="auctionList_lead">
        BATONでは毎週新しい音楽がオークションに出品されます
      </p>
      <div class="content">
        <div class="auctionList_wrap">
          <p v-if="displayAuctionList.length < 1" class="auctionList_none">
            現在、開催中のオークションはございません
          </p>
          <article
            v-for="(x, index) in displayAuctionList"
            :key="index"
            class="auctionList_item"
          >
            <figure
              class="auctionList_item_img"
              @click="selectItem(displayAuctionList[index].著作権番号)"
            >
              <img :src="displayAuctionList[index].image1" />
            </figure>
            <h3 class="auctionList_item_title">
              {{ displayAuctionList[index].タイトル }}
            </h3>
            <p class="auctionList_item_artist">
              {{ displayAuctionList[index].歌手1 }}
            </p>
            <dl class="auctionList_item_info">
              <dt>最高値</dt>
              <dd>
                {{
                  displayAuctionList[index].最高入札額
                    ? changeYen(displayAuctionList[index].最高入札額)
                    : changeYen(displayAuctionList[index].オークション開始金額)
                }}
                <span class="unit">円</span>
                <span
                  v-if="displayAuctionList[index].分配金額 > 0"
                  class="unit-right"
                >
                  (想定年利回り
                  {{
                    displayAuctionList[index].分配金額
                      ? (
                          (displayAuctionList[index].分配金額 /
                            displayAuctionList[index].最高入札額) *
                          100
                        ).toFixed(1)
                      : 0
                  }}
                  %)
                </span>
              </dd>
              <dt>スタート金額</dt>
              <dd>
                {{ changeYen(displayAuctionList[index].オークション開始金額) }}
                <span class="unit">円</span>
                <span
                  v-if="displayAuctionList[index].分配金額 > 0"
                  class="unit-right"
                >
                  (想定年利回り
                  {{
                    displayAuctionList[index].分配金額
                      ? (
                          (displayAuctionList[index].分配金額 /
                            displayAuctionList[index].オークション開始金額) *
                          100
                        ).toFixed(1)
                      : 0
                  }}
                  %)
                </span>
              </dd>
              <dt>競争率</dt>
              <dd>
                {{
                  displayAuctionList[index].入札数量
                    ? (
                        (displayAuctionList[index].入札数量 /
                          displayAuctionList[index].オークション数量) *
                        100
                      ).toFixed(1)
                    : 0
                }}
                <span class="unit">%</span>
              </dd>
            </dl>
            <button
              class="button-action"
              @click="selectItem(displayAuctionList[index].著作権番号)"
            >
              入札する
            </button>
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
      auctionList: [],
      displayAuctionList: []
    };
  },
  created: async function() {},
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      const searchConditonApplicabilityOnHomepage = "掲載する";
      this.auctionList = await this.getAuctionList(
        searchConditonApplicabilityOnHomepage
      );
      this.auctionList = this.auctionList.filter(function(value) {
        const diff = moment(
          moment(value.オークション終了時間)
            .tz("Asia/Tokyo")
            .format()
            .slice(0, -14) + value.オークション終了時刻
        ).diff(moment());
        return diff > 0;
      });
      var auctionBidReport = {};
      auctionBidReport = await this.$hexalink.getPublicReports(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.report.VUE_APP_AUCTIONLISTREPORT_ID,
        {
          conditions: []
        }
      );
      // const distributionList = await this.getDistributionList();
      // const distributionListGroup = distributionList.reduce(function(
      //   result,
      //   current
      // ) {
      //   const element = result.find(function(p) {
      //     return p.著作権番号 === current.著作権番号;
      //   });
      //   if (element) {
      //     element.count++; // count
      //     element.分配金額 += Number(current.分配金額); // sum
      //   } else {
      //     result.push({
      //       著作権番号: current.著作権番号,
      //       count: 1,
      //       分配金額: Number(current.分配金額)
      //     });
      //   }
      //   return result;
      // },
      // []);
      for (const listKey in this.auctionList) {
        // 著作権番号から分配金を取得する
        this.$set(
          this.auctionList[listKey],
          "分配金額",
          await this.getDistributionList(this.auctionList[listKey].著作権番号)
        );
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
        // for (const key in distributionListGroup) {
        //   if (
        //     this.auctionList[listKey].著作権番号 ==
        //     distributionList[key]["著作権番号"]
        //   ) {
        //     this.$set(
        //       this.auctionList[listKey],
        //       "分配金額",
        //       distributionListGroup[key]["分配金額"]
        //     );
        //   }
        // }
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
    async getAuctionList(searchConditonApplicabilityOnHomepage) {
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTTABLE_ID,
        {
          conditions: [
            {
              id: "HPに掲載可否", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [searchConditonApplicabilityOnHomepage]
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
    async getClosedAuctionList() {
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTTABLE_ID,
        {
          conditions: [
            {
              id: "オークション状況", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["オークション完了"],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    async getDistributionList(musicId) {
      let searchFrom = "";
      let searchTo = "";
      const latestRecord = await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTDISTRIBUTIONTABLE_ID,
        {
          conditions: [
            {
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [musicId],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 1,
          use_display_id: true,
          sort_field_id: "日付", // Hexalink画⾯で⼊⼒したIDを指定
          sort_order: "desc"
        }
      );
      if (!latestRecord.length > 0) return [];
      const jstMonth = moment(latestRecord[0].日付)
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .slice(5, 7);
      switch (jstMonth) {
        case "10":
        case "11":
        case "12":
          searchFrom =
            moment(latestRecord[0].日付)
              .utc()
              .add("year", -1)
              .startOf("year")
              .format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
          searchTo =
            moment(latestRecord[0].日付)
              .utc()
              .add("year", -1)
              .endOf("year")
              .format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
          break;
        case "01":
        case "02":
        case "03":
          searchFrom =
            moment(latestRecord[0].日付)
              .add("year", -1)
              .format("YYYY-03-31T15:00:00.000") + "Z";
          searchTo =
            moment(latestRecord[0].日付).format("YYYY-03-30T15:00:00.000") +
            "Z";
          break;
        case "04":
        case "05":
        case "06":
          searchFrom =
            moment(latestRecord[0].日付)
              .utc()
              .add("year", -1)
              .format("YYYY-06-30T15:00:00.000") + "Z";
          searchTo =
            moment(latestRecord[0].日付).format("YYYY-06-29T15:00:00.000") +
            "Z";
          break;
        case "07":
        case "08":
        case "09":
          searchFrom =
            moment(latestRecord[0].日付)
              .utc()
              .add("year", -1)
              .format("YYYY-09-30T15:00:00.000") + "Z";
          searchTo =
            moment(latestRecord[0].日付).format("YYYY-09-29T15:00:00.000") +
            "Z";
          break;
      }
      const distributionTargetSeasonList = await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTDISTRIBUTIONTABLE_ID,
        {
          conditions: [
            {
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [musicId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "日付", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [searchFrom, searchTo]
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
      const distributionTargetSeasonListGroupQuarter = this.groupByQuarter(
        distributionTargetSeasonList
      );
      let musicDistribution = 0;
      for (const i in distributionTargetSeasonListGroupQuarter) {
        for (const j in distributionTargetSeasonListGroupQuarter[i]) {
          musicDistribution += Number(
            distributionTargetSeasonListGroupQuarter[i][j].分配金額
          );
        }
      }
      console.log(musicDistribution);
      return musicDistribution;
    },
    groupByQuarter(array) {
      if (!array.length > 0) return;
      const groups = {};
      array.sort(function(a, b) {
        return a.日付 < b.日付 ? 1 : -1;
      });
      console.log(array[0].日付);
      const latestRecordSeason = moment(array[0]["日付"])
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .slice(5, 7);
      const latestRecordYear = moment(array[0]["日付"])
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .slice(0, 4);
      switch (latestRecordSeason) {
        case "01":
        case "02":
        case "03":
          groups[String(Number(latestRecordYear) - 1) + "年第1四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第2四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第3四半期"] = [];
          groups[latestRecordYear + "年第4四半期"] = [];
          break;
        case "04":
        case "05":
        case "06":
          groups[String(Number(latestRecordYear) - 1) + "年第3四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第4四半期"] = [];
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          break;
        case "07":
        case "08":
        case "09":
          groups[String(Number(latestRecordYear) - 1) + "年第4四半期"] = [];
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          groups[latestRecordYear + "年第3四半期"] = [];
          break;
        case "10":
        case "11":
        case "12":
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          groups[latestRecordYear + "年第3四半期"] = [];
          groups[latestRecordYear + "年第4四半期"] = [];
          break;
      }

      for (const key in array) {
        const jstMonth = moment(array[key]["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM")
          .slice(5, 7);
        const jstYear = moment(array[key]["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM")
          .slice(0, 4);
        switch (jstMonth) {
          case "01":
          case "02":
          case "03":
            groups[jstYear + "年第1四半期"].push(array[key]);
            break;
          case "04":
          case "05":
          case "06":
            groups[jstYear + "年第2四半期"].push(array[key]);
            break;
          case "07":
          case "08":
          case "09":
            groups[jstYear + "年第3四半期"].push(array[key]);
            break;
          case "10":
          case "11":
          case "12":
            groups[jstYear + "年第4四半期"].push(array[key]);
            break;
        }
      }
      Object.keys(groups).sort();
      return groups;
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
    changeYen(num) {
      return String(num)
        .split("")
        .reverse()
        .join("")
        .match(/\d{1,3}/g)
        .join(",")
        .split("")
        .reverse()
        .join("");
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
          order = this.defaultSortFunc(a, b, key);
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
