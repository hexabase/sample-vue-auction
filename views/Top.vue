<template>
  <div class="top">
    <section class="heroHeader">
      <h2 class="heroHeader_title">
        もう諦めていた“アレ”が手に入るオークションサイト
      </h2>
      <!-- <p class="heroHeader_enText">
        The marketplace for buying music royalties
      </p> -->
      <p class="heroHeader_text">Hexabid</p>
      <a class="button-main" @click="scrollToHash('#about')">
        どんなサービス
      </a>
    </section>
    <section class="pickupAuction">
      <h3 class="contents_title">
        <span class="contents_title-en">On Going</span>
        <span class="contents_title-jp">開催中のオークション</span>
      </h3>
      <div class="pickupAuction_wrap">
        <div class="pickupAuction_list">
          <article
            v-for="(x, index) in displayAuctionList"
            :key="index"
            class="pickupAuction_item"
            @click="selectItem(displayAuctionList[index].著作権番号)"
          >
            <figure class="pickupAuction_img">
              <img :src="displayAuctionList[index].image1" />
              <figcaption>
                <span class="pickupAuction_day">
                  {{ displayAuctionList[index].カウントダウン日 }}
                </span>
                <span
                  v-html="displayAuctionList[index].カウントダウン時分秒"
                ></span>
              </figcaption>
            </figure>
            <div class="pickupAuction_title">
              {{ displayAuctionList[index].タイトル }}
            </div>
            <div class="pickupAuction_artist">
              {{ displayAuctionList[index].歌手1 }}
            </div>
            <div class="pickupAuction_price">
              {{ changeYen(displayAuctionList[index].オークション開始金額) }}
              <span class="unit">円〜</span>
            </div>
            <div class="pickupAuction_stock">
              {{
                displayAuctionList[index].入札数量
                  ? displayAuctionList[index].入札数量
                  : 0
              }}
              <span class="unit">口入札 / </span>
              {{ displayAuctionList[index].オークション数量 }}
              <span class="unit">口</span>
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
          <p v-if="displayAuctionList.length < 1" class="auctionList_none">
            現在、開催中のオークションはございません
          </p>
        </div>
      </div>
      <div class="pickupAuction_link">
        <router-link to="/auctionList" class="button-main">
          すべてのオークションを見る
        </router-link>
      </div>
    </section>
    <section v-if="false" class="userMarket">
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
              <div class="userMarket_title">Lemon</div>
              <div class="userMarket_artist">米津玄師</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">100</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://img.lap.recochoku.jp/p1/imgkp?p=%2F12%2F1430%2F147360000.jpg&f=776E72&FFh=300&FFw=300&h=53650&option=FFenl%3Don"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">瞬間的シックスセンス</div>
              <div class="userMarket_artist">あいみょん</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">200</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://img.lap.recochoku.jp/p1/imgkp?p=%2F12%2F1010%2F158862530.jpg&f=736E79&FFh=300&FFw=300&h=3C188&option=FFenl%3Don"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">from the edge</div>
              <div class="userMarket_artist">FictionJunction feat. Lisa</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,200</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://img.lap.recochoku.jp/p1/imgkp?p=%2F12%2F3126%2F126606037.jpg&f=617678&FFh=300&FFw=300&h=2A69E&option=FFenl%3Don"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">THE GUERRiLLA BiSH</div>
              <div class="userMarket_artist">BiSH</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,200</span>
                円
              </div>
            </a>
          </li>
          <li class="userMarket_item">
            <a href="">
              <figure class="userMarket_img">
                <img
                  src="https://img.lap.recochoku.jp/p1/imgkp?p=%2F12%2F5659%2F151270506.jpg&f=776E72&FFh=300&FFw=300&h=862FB&option=FFenl%3Don"
                  alt=""
                />
              </figure>
              <div class="userMarket_title">ハルノ匕</div>
              <div class="userMarket_artist">あいみょん</div>
              <div class="userMarket_price">
                最安値：
                <span class="price">1,200</span>
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
            <router-link to="News">一覧</router-link>
          </span>
        </h3>
        <ul class="news_list">
          <li v-for="(news, index) in newsList" :key="index" class="news_item">
            <router-link :to="{ name: 'News', hash: `#news${index}` }">
              <span class="news_date">
                {{ formatNewsDate(newsList[index].日付) }}
              </span>
              {{ newsList[index].タイトル }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section id="about" class="about">
      <div class="content">
        <h3 class="contents_title">
          <span class="contents_title-en">What is “Hexabid”</span>
        </h3>
        <div class="about_wrap">
          <h4 class="about_title">
            あの時欲しかったものを発掘する<br />
            オークションサイト
          </h4>
          <p class="about_text">
            子供のころ欲しかったアレは今なら買える。<br />
            是非あなたのコレクションに懐かしのアイテムを追加してください。
          </p>
        </div>
      </div>
      <section class="aboutService about_sub">
        <h4 class="about_subTitle">
          <span class="about_subTitle-en">About Service</span>
          <span class="about_subTitle-jp">どんなサービス？</span>
        </h4>
      </section>
      <section class="aboutStep about_sub">
        <h4 class="about_subTitle">
          <span class="about_subTitle-en">Step</span>
          <span class="about_subTitle-jp">始めるまでのステップ</span>
        </h4>
        <ol class="content aboutStep_list">
          <li>
            <div class="aboutStep_step">Step.<span>1</span></div>
            <div class="aboutStep_title">新規ユーザー登録</div>
            <figure class="aboutStep_img">
              <img
                src="~@/assets/img/step1.png"
                alt="Step.1 新規ユーザー登録"
              />
            </figure>
            <p class="aboutStep_text">
              お客様のメールアドレスのみで簡単に登録できます。
            </p>
          </li>
          <li>
            <div class="aboutStep_step">Step.<span>2</span></div>
            <div class="aboutStep_title">オンライン上で<br />口座開設</div>
            <figure class="aboutStep_img">
              <img
                src="~@/assets/img/step2.png"
                alt="Step.2 オンライン上で口座開設"
              />
            </figure>
            <p class="aboutStep_text">
              住所氏名、ご利用の金融機関など、必要な項目を入力し、本人確認書類とマイナンバーをご提示いただきます。
            </p>
          </li>
          <li>
            <div class="aboutStep_step">Step.<span>3</span></div>
            <div class="aboutStep_title">オークション参加</div>
            <figure class="aboutStep_img">
              <img
                src="~@/assets/img/step3.png"
                alt="Step.3 オークション参加"
              />
            </figure>
            <p class="aboutStep_text">
              最短●営業日で審査が完了します。お客様のメールアドレスに「審査完了通知」を発送し、オークションの入札参加が可能になります。
            </p>
          </li>
          <li>
            <div class="aboutStep_step">Step.<span>4</span></div>
            <div class="aboutStep_title">落札後に入金</div>
            <figure class="aboutStep_img">
              <img src="~@/assets/img/step4.png" alt="Step.4 落札後に入金" />
            </figure>
            <p class="aboutStep_text">
              オークションで落札出来た後に「落札成功通知」のメールに記載している口座に振り込みを行っていただきます。
            </p>
          </li>
          <li>
            <div class="aboutStep_step">Step.<span>5</span></div>
            <div class="aboutStep_title">落札した商品が到着</div>
            <figure class="aboutStep_img">
              <img
                src="~@/assets/img/step5.png"
                alt="Step.5 落札した商品が到着"
              />
            </figure>
            <p class="aboutStep_text">
              入金確認後に、「入金確認通知」を送信します。その後出品者から商品が届きます。
            </p>
          </li>
          <!-- <li>
            <div class="aboutStep_step">Step.<span>6</span></div>
            <div class="aboutStep_title">分配金を受取る</div>
            <figure class="aboutStep_img">
              <img src="~@/assets/img/step6.png" alt="Step.6 分配金を受取る" />
            </figure>
            <p class="aboutStep_text">
              四半期ごとに、保有する著作権資産の分配金を受け取ることができます。
            </p>
          </li> -->
        </ol>
      </section>
    </section>
    <div class="indexFooter">
      <p class="indexFooter_text">
        あなたも、好きな音楽に投資を始めてみませんか
      </p>
      <router-link v-if="!userId" to="/signin" class="button-action">
        まずは新規登録
      </router-link>
      <router-link v-if="userId" to="/auctionlist" class="button-action">
        取引中オークション
      </router-link>
    </div>
  </div>
</template>

<script>
import mapping from "@/assets/json/auctionDBMapping.json";
import moment from "moment-timezone";
import _ from "lodash";
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
      userId: this.$store.getters["user/getHexaID"],
      auctionList: [],
      displayAuctionList: [],
      newsList: []
    };
  },
  created: async function() {},
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      this.auctionList = await this.getAuctionList();
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
      const params = {
        workspace_id: window.env.VUE_APP_WORKSPACE_ID,
        url:
          "/api/v0/applications/" +
          window.env.VUE_APP_APPLICATION_ID +
          "/reports/" +
          window.env.report.VUE_APP_AUCTIONLISTREPORT_ID +
          "/filter",
        method: "POST",
        params: {
          conditions: []
        }
      };
      auctionBidReport = await this.$hexalink.unauthorizedCall(params);
      for (const listKey in this.auctionList) {
        const image1Binary = this.auctionList[listKey].image1;
        if (image1Binary) {
          const params = {
            workspace_id: window.env.VUE_APP_WORKSPACE_ID,
            url: "/api/v0/files/" + image1Binary,
            method: "GET"
          };
          const ab = await this.$hexalink.unauthorizedCallFile(params);
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
      this.updateMessage();
      setInterval(this.updateMessage, 1000);
      this.newsList = await this.getNewsList();
      const hash = this.$route.hash;
      if (hash && hash.match(/^#.+$/)) {
        this.scrollToHash(hash);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // loading overlay非表示
      this.$store.commit("common/setLoading", false);
    }
  },
  methods: {
    async getAuctionList() {
      const params = {
        workspace_id: window.env.VUE_APP_WORKSPACE_ID,
        url:
          "/api/v0/applications/" +
          window.env.VUE_APP_APPLICATION_ID +
          "/datastores/" +
          window.env.table.VUE_APP_COPYRIGHTTABLE_ID +
          "/items/search",
        method: "POST",
        params: {
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
          sort_order: "asc"
        }
      };
      return (await this.$hexalink.unauthorizedCall(params)).items;
    },
    updateMessage() {
      for (const key in this.displayAuctionList) {
        // diffメソッドを使って、日時の差を、ミリ秒で取得
        const diff = moment(
          moment(this.displayAuctionList[key].オークション終了時間)
            .tz("Asia/Tokyo")
            .format()
            .slice(0, -14) + this.displayAuctionList[key].オークション終了時刻
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
          diff > 0
            ? ("00" + hours).slice(-2) +
                "<span class='unit'>時間</span>" +
                ("00" + minutes).slice(-2) +
                "<span class='unit'>分</span>" +
                ("00" + seconds).slice(-2) +
                "<span class='unit'>秒</span>"
            : ""
        );
      }
    },
    selectItem(musicId) {
      this.$router.push("/auctionbid/" + musicId);
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
    },
    async getNewsList() {
      const params = {
        workspace_id: window.env.VUE_APP_WORKSPACE_ID,
        url:
          "/api/v0/applications/" +
          window.env.VUE_APP_APPLICATION_ID +
          "/datastores/" +
          window.env.table.VUE_APP_NEWSTABLE_ID +
          "/items/search",
        method: "POST",
        params: {
          conditions: [],
          page: 1,
          per_page: 3,
          use_display_id: true,
          sort_field_id: "日付",
          sort_order: "desc"
        }
      };
      return (await this.$hexalink.unauthorizedCall(params)).items;
    },
    scrollToHash(hash) {
      let hashName = hash.replace("#", "");
      let elmPosi = document.getElementById(hashName).getBoundingClientRect();
      let headerHeight = window.innerWidth < 800 ? 40 : 80;
      let hashY = elmPosi.top + window.pageYOffset - headerHeight;
      if (this.auctionList.length > 0) {
        let auctionListHeight = document
          .getElementsByClassName("pickupAuction_list")[0]
          .getBoundingClientRect();
        if (auctionListHeight.height < 1) {
          hashY = hashY + 330;
        }
      }
      window.scrollTo({
        top: hashY,
        behavior: "smooth"
      });
    },
    formatNewsDate(date) {
      return moment(date)
        .tz("Asia/Tokyo")
        .format("YYYY.MM.DD");
    }
  }
};
</script>
