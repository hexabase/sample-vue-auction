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
      <ul class="pageHeader_tab">
        <li class="pageHeader_tabItem-current">取引中オークション</li>
        <li class="pageHeader_tabItem">オークション終了</li>
      </ul>
    </header>
    <section class="auctionList">
      <h2 class="page_title">取引中オークション</h2>
      <p class="auctionList_lead">
        BATONでは毎週新しい音楽がオークションに出品されます
      </p>
      <div class="content">
        <div class="auctionList_wrap">
          <article
            v-for="(x, index) in displayAuctionList"
            :key="index"
            class="auctionList_item"
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
            <dl class="auctionList_item_info">
              <dt>最高値</dt>
              <dd>
                {{
                  displayAuctionList[index].最高入札額
                    ? displayAuctionList[index].最高入札額
                    : displayAuctionList[index].オークション開始金額
                }}<span class="unit">円（年2.2%）</span>
              </dd>
              <dt>スタート金額</dt>
              <dd>
                {{ displayAuctionList[index].オークション開始金額
                }}<span class="unit">円（年2.2%）</span>
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
          v-model="page"
          :length="length"
          @input="pageChange(page)"
        ></v-pagination>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      pageSize: 4,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getHexaID"],
      auctionList: [],
      displayAuctionList: []
    };
  },
  created: async function() {},
  mounted: async function() {
    this.auctionList = await this.getAuctionList();
    var auctionBidReport = {};
    auctionBidReport = await this.$hexalink.getReports(
      this.token,
      this.applicationId,
      "5ec76bffaa8a6c0007136f92",
      {
        conditions: []
      }
    );
    for (const listKey in this.auctionList) {
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

    this.length = Math.ceil(this.auctionList.length / this.pageSize);
    this.displayAuctionList = this.auctionList.slice(
      this.pageSize * (this.page - 1),
      this.pageSize * this.page
    );
  },
  methods: {
    async getAuctionList() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["著作権DB"],
        {
          conditions: [
            {
              id: "オークション状況", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["オークション中"],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    async getFinishedAuctionList() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["著作権DB"],
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
    selectItem(musicId) {
      this.$router.push("/auctionbid?id=" + musicId);
    },
    pageChange(pageNumber) {
      this.displayAuctionList = this.auctionList.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    }
  }
};
</script>

<style scoped></style>
