<template>
  <div class="top">
    <section class="heroHeader">
      <h2 class="heroHeader_title">音楽著作権を資産に</h2>
      <p class="heroHeader_enText">
        The marketplace for buying music royalties
      </p>
      <p class="heroHeader_text">ロイヤリティ共有プラットフォーム ”BATON”</p>
      <a href="/about" class="button-main">どんなサービス</a>
    </section>
    <section class="pickupAuction">
      <h3 class="contents_title">
        <span class="contents_title-en">Pickup Auction</span>
        <span class="contents_title-jp">開催中のオークション</span>
      </h3>
      <ul class="pickupAuction_list">
        <article
          v-for="(x, index) in displayAuctionList"
          :key="index"
          class="pickupAuction_item"
          @click="selectItem(displayAuctionList[index].著作権番号)"
        >
          <figure class="pickupAuction_img">
            <img :src="displayAuctionList[index].image1" />
            <figcaption>
              <span>あと</span>
              {{ displayAuctionList[index].カウントダウン日 }}
              <span>日</span>
              {{ displayAuctionList[index].カウントダウン時分秒 }}
            </figcaption>
          </figure>
          <div class="pickupAuction_title">
            {{ displayAuctionList[index].タイトル }}
          </div>
          <div class="pickupAuction_artist">
            {{ displayAuctionList[index].歌手1 }}
          </div>
          <div class="pickupAuction_price">
            {{ displayAuctionList[index].オークション開始金額 }}
            <span class="unit">円〜</span>
          </div>
          <div class="pickupAuction_stock">
            {{
              displayAuctionList[index].入札数量
                ? displayAuctionList[index].入札数量
                : 0
            }}
            <span class="unit">株入札 / </span>
            {{ displayAuctionList[index].オークション数量 }}
            <span class="unit">株</span>
          </div>
          <div class="pickupAuction_bidRate">
            {{
              displayAuctionList[index].入札数量
                ? (
                    (displayAuctionList[index].入札数量 /
                      displayAuctionList[index].オークション数量) *
                    100
                  ).toFixed(1)
                : 0
            }}
          </div>
        </article>
        <!-- <li class="pickupAuction_item">
          <a href="">
            <figure class="pickupAuction_img">
              <img
                src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                alt=""
              />
              <figcaption><span>あと</span>1<span>日</span>12:34:56</figcaption>
            </figure>
            <div class="pickupAuction_title">パラボラ</div>
            <div class="pickupAuction_artist">Official髭男dism</div>
            <div class="pickupAuction_price">
              1,500
              <span class="unit">円〜</span>
            </div>
            <div class="pickupAuction_stock">
              1200
              <span class="unit">株入札 / </span>
              1500
              <span class="unit">株</span>
            </div>
            <div class="pickupAuction_bidRate">125</div>
          </a>
        </li> -->
      </ul>
      <div class="pickupAuction_link">
        <a href="/auctionList" class="button-main">
          すべてのオークションを見る
        </a>
      </div>
    </section>
    <section class="userMarket">
      <div class="content">
        <h3 class="contents_title">
          <span class="contents_title-en">User Market</span>
          <span class="contents_title-jp">ユーザー間取引</span>
        </h3>
        <ul class="userMarket_list">
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">パラボラ</div>
              <div class="userMarket_artist">Official髭男dism</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,500</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">パラボラ</div>
              <div class="userMarket_artist">Official髭男dism</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,500</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">パラボラ</div>
              <div class="userMarket_artist">Official髭男dism</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,500</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">パラボラ</div>
              <div class="userMarket_artist">Official髭男dism</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,500</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://pbs.twimg.com/media/EWCIGfqVAAQ8q9A?format=jpg&name=4096x4096"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">パラボラ</div>
              <div class="userMarket_artist">Official髭男dism</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,500</span>
                円
              </div>
            </a>
          </li>
        </ul>
        <div class="pickupAuction_link">
          <a href="" class="button-main">ユーザー間取引 一覧へ</a>
        </div>
      </div>
    </section>
    <section class="news">
      <div class="content">
        <h3 class="contents_title">
          <span class="contents_title-en">News</span>
          <span class="contents_title-jp">
            お知らせ
            <a href="">一覧</a>
          </span>
        </h3>
        <ul class="news_list">
          <li class="news_item">
            <a href="">
              <span class="news_date">2020.09.01</span>
              BATONサービスをスタートしました。
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="about">
      <div class="content">
        <h3 class="contents_title">
          <span class="contents_title-en">What is “Music royalty”</span>
        </h3>
        <div class="about_wrap">
          <h4 class="about_title">
            音楽著作権が資産になる、<br />
            新しい投資スタイル
          </h4>
          <p class="about_text">
            好きな音楽の著作権をオークション形式で落札してあなたのものに。<br />
            保有する権利で得られた利益が配当されます。権利は株式で分配されるので、少額から投資を始めることができます。
          </p>
          <a class="button-main" href="">もっと詳しく</a>
        </div>
      </div>
    </section>
    <div class="indexFooter">
      <p class="indexFooter_text">
        あなたも、好きな音楽に投資を始めてみませんか
      </p>
      <a class="button-action" href="">もっと詳しく</a>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
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

    setInterval(this.updateMessage, 1000);
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
              id: "オークション終了時間", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [moment(), null],
              exact_match: false // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    updateMessage() {
      for (const key in this.displayAuctionList) {
        // diffメソッドを使って、日時の差を、ミリ秒で取得
        const diff = moment(
          this.displayAuctionList[key].オークション終了時間
        ).diff(moment());

        // ミリ秒からdurationオブジェクトを生成
        const duration = moment.duration(diff);

        // 日・時・分・秒を取得
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        //カウントダウンの結果を変数に代入
        this.$set(
          this.displayAuctionList[key],
          "カウントダウン日",
          diff > 0 ? days : "Closed"
        );
        this.$set(
          this.displayAuctionList[key],
          "カウントダウン時分秒",
          diff > 0 ? hours + ":" + minutes + ":" + seconds : ""
        );
      }
    },
    selectItem(musicId) {
      this.$router.push("/auctionbid?id=" + musicId);
    }
  }
};
</script>
