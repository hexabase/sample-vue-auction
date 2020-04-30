<template>
  <v-row>
    <v-col align="center" justify="center">
      <div id="page_auction" data-role="page">
        <div class="detail_zone">
          <div class="row-col-2">
            <div class="detail_left">
              <div class="detail_txt">
                <div class="thumbnail">
                  <a :href="videoUrl" target="_blank">
                    <img :src="videoThumbnailUrl" />
                  </a>
                </div>
                <ul class="song_info">
                  <li class="song_title">
                    <strong>{{ title }}</strong>
                  </li>
                  <li class="artist">{{ singer1 }}</li>
                  <li class="pb10">{{ explanatoryText }}</li>
                </ul>
              </div>
            </div>
            <div class="detail_right order1">
              <input type="hidden" name="cmd" value="bid" />
              <input type="hidden" name="id" value="500" />
              <h4>オークションの進行状況</h4>
              <ul>
                <li>
                  <img :src="image1" class="thumb_img" />
                  <div class="thumb_wrap">{{ title }}</div>
                </li>
                <li>
                  <span>残り時間</span>
                  <strong id="time_remaining">{{ remainingTime }}</strong>
                </li>
                <li>
                  <span>オークション数量</span>
                  <strong>{{ auctionAmount }}株</strong>
                </li>
                <li>
                  <span>オークション開始価格（1週、消費税を含む）</span>
                  <strong>{{ auctionStartPrice }}</strong>
                </li>
                <li class="multi_option">
                  <div class="option_tit">
                    <span>入札価格（1株）</span>
                    <span>入札数量</span>
                    <span>オークション結果</span>
                  </div>
                  <div
                    v-for="value in auctionListsGroup"
                    :key="value.入札金額"
                    class="option"
                  >
                    <ul>
                      <li>{{ value.入札金額 }}円</li>
                      <li>{{ value.数量 }}</li>
                      <li>{{ value.落札状況 }}</li>
                    </ul>
                  </div>
                  <div class="option total">
                    <ul>
                      <li>合計</li>
                      <li>{{ bidTotalAmount }}</li>
                      <li></li>
                    </ul>
                  </div>
                </li>
                <li class="cb bid_box">
                  <span>入札数量</span>
                  <p>
                    <input
                      id="cnt_units"
                      v-model="bidAmount"
                      type="text"
                      name="cnt_units"
                    />
                  </p>
                </li>
                <li class="cb bid_box">
                  <span>入札価格（1週、消費税を含む）</span>
                  <p>
                    <input
                      id="amount"
                      v-model="bidPrice"
                      type="text"
                      name="amount"
                    />
                  </p>
                  <em class="tar" style="padding-bottom:0">
                    *500円の倍数で入札可能です。
                  </em>
                </li>
                <!-- <li class="txt_s bid_box">
                  <span>参加規定：</span>
                  5万ウォンを超える入札時入札保証金（入札金の5％）が自動的に差し引かれます。
                  <br />再入札時差額入札保証金が差し引か・返されます。
                  <br />入札最終日には、親の数量・上位金額の再入札のみ可能です。
                  <br />最終未落札時入札保証金は、自動的に返されます。
                </li>
                <li class="txt_s bid_box">
                  <span>キャンセルポリシー：</span>
                  入札キャンセル入札保証金は、私の財布に自動的に返されます。
                  <br />入札最終日はキャンセルが不可で上位数量・上位金額の再入札のみ可能です。
                  <br />落札後未入金などの理由で落札取り消しの際入札保証金は返されません。
                </li>
                <li>
                  <span>私の入札価格に比べ、最近1年著作権料（％）</span>
                  <strong id="ratio_amount_royalty">7.6％</strong>
                </li> -->
                <!-- <li>
                  <span>総入札価格（消費税を含む）</span>
                  <strong id="amount_total">29,500ウォン</strong>
                </li> -->
                <div class="one_btn">
                  <div class="one_red">
                    <div class="bid_button" @click="openModal">
                      入札する
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <!-- 옥션 결과 -->
        <!-- 곡 상세 정보 v2 -->
        <section class="song_detail">
          <div class="col-12">
            <h3>著作権情報</h3>
            <div class="box_gray">
              <div class="lst_bul">
                <dl>
                  <dt>公表日</dt>
                  <dd>{{ publicationDate }}</dd>
                </dl>
                <dl>
                  <dt>歌手</dt>
                  <dd>{{ singer1 }}</dd>
                </dl>
                <dl>
                  <dt>作曲</dt>
                  <dd>{{ composer1 }}</dd>
                </dl>
                <dl>
                  <dt>作詞</dt>
                  <dd>{{ lyricist1 }}</dd>
                </dl>
                <dl>
                  <dt>編曲</dt>
                  <dd>{{ arranger1 }}</dd>
                </dl>
                <dl>
                  <dt>著作権保護期間</dt>
                  <dd>{{ protectionPeriod }}</dd>
                </dl>
                <!-- <dl>
                  <dt>最近12ヶ月のロイヤリティ（1週間あたり）</dt>
                  <dd>2,234ウォン</dd>
                </dl> -->
                <!-- <dl>
                  <dt>より比最近12ヶ月の収益率</dt>
                  <dd>8％</dd>
                </dl> -->
                <dl>
                  <dt>管理出版社</dt>
                  <dd>{{ managementPublisher }}</dd>
                </dl>
                <dl>
                  <dt>著作権株式</dt>
                  <dd>
                    <p>{{ copyrightType }}</p>
                  </dd>
                </dl>
                <dl>
                  <dt>その他の主な事項</dt>
                  <dd>
                    {{ otherNotes }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="example-modal-window">
        <!-- コンポーネント MyModal -->
        <MyModal v-if="modal" @close="closeModal">
          <!-- default スロットコンテンツ -->
          <div>入札数量：{{ bidAmount }}</div>
          <div>入札価格：{{ bidPrice }}</div>
          <!-- /default -->
          <!-- footer スロットコンテンツ -->
          <template slot="footer">
            <button @click="doSend">入札</button>
          </template>
          <!-- /footer -->
        </MyModal>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import mapping from "@/assets/json/auctionDBMapping.json";
import DatabaseSchema from "@/assets/json/DBSchema.json";
import MyModal from "./MyModal.vue";
export default {
  components: { MyModal },
  data() {
    return {
      modal: false,
      currentStep: 1,
      page: 1,
      pageCount: 0,
      mapping: JSON.parse(JSON.stringify(mapping)),
      DBSchema: JSON.parse(JSON.stringify(DatabaseSchema)),
      options: { page: 1, itemsPerPage: 100 },
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      searchParams: {},
      copyrightNumber: "",
      jasracCode: "",
      image1: "",
      image2: "",
      image3: "",
      copyrightType: "",
      title: "",
      titleEn: "",
      titleKr: "",
      singer1: "",
      singer2: "",
      singer3: "",
      singer4: "",
      composer1: "",
      composer2: "",
      composer3: "",
      composer4: "",
      lyricist1: "",
      lyricist2: "",
      lyricist3: "",
      lyricist4: "",
      arranger1: "",
      arranger2: "",
      arranger3: "",
      arranger4: "",
      explanatoryText: "",
      explanatoryTextEn: "",
      explanatoryTextKr: "",
      publicationDate: "",
      originalAuthorDeathDate: "",
      protectionPeriod: "",
      aaHoldingInterest: "",
      bbHoldingInterest: "",
      ccHoldingInterest: "",
      ddHoldingInterest: "",
      eeHoldingInterest: "",
      possessionNotes: "",
      videoUrl: "",
      otherNotes: "",
      Tag: "",
      applicability: "",
      applicabilityOnHomepage: "",
      rightsStartDate: "",
      rightPeriod: "",
      Seller: "",
      managementPublisher: "",
      totalAmount: "",
      auctionStatus: "",
      auctionStartDate: "",
      auctionEndDate: "",
      auctionAmount: "",
      auctionStartPrice: "",
      auctionEndPrice: "",
      videoThumbnailUrl: "",
      auctionListsGroup: [],
      bidTotalAmount: 0,
      bidPrice: 0,
      bidAmount: 1,
      remainingTime: ""
    };
  },
  created: async function() {
    var dataLists = [];
    dataLists = await this.$hexalink.getItems(
      this.token,
      this.applicationId,
      this.datastoreIds["著作権DB"],
      {
        conditions: [
          {
            id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
            search_value: ["著作権番号1"],
            exact_match: true // 完全⼀致で検索
          }
        ],
        page: 1,
        per_page: 9000,
        use_display_id: true
      }
    );
    console.log(dataLists);
    var titleEn = "タイトル（英語）";
    var titleKr = "タイトル（韓国）";
    var explanatoryTextEn = "説明文（英語）";
    var explanatoryTextKr = "説明文（韓国）";
    this.copyrightNumber = dataLists[0].著作権番号;
    this.jasracCode = dataLists[0].JASRAC作品コード;
    this.image1 = dataLists[0].image1;
    this.image2 = dataLists[0].image2;
    this.image3 = dataLists[0].image3;
    this.copyrightType = dataLists[0].著作権タイプ;
    this.title = dataLists[0].タイトル;
    this.titleEn = dataLists[0].titleEn;
    this.titleKr = dataLists[0].titleKr;
    this.singer1 = dataLists[0].歌手1;
    this.singer2 = dataLists[0].歌手2;
    this.singer3 = dataLists[0].歌手3;
    this.singer4 = dataLists[0].歌手4;
    this.composer1 = dataLists[0].作曲1;
    this.composer2 = dataLists[0].作曲2;
    this.composer3 = dataLists[0].作曲3;
    this.composer4 = dataLists[0].作曲4;
    this.lyricist1 = dataLists[0].作詞1;
    this.lyricist2 = dataLists[0].作詞2;
    this.lyricist3 = dataLists[0].作詞3;
    this.lyricist4 = dataLists[0].作詞4;
    this.arranger1 = dataLists[0].編曲1;
    this.arranger2 = dataLists[0].編曲2;
    this.arranger3 = dataLists[0].編曲3;
    this.arranger4 = dataLists[0].編曲4;
    this.explanatoryText = dataLists[0].説明文;
    this.explanatoryTextEn = dataLists[0].explanatoryTextEn;
    this.explanatoryTextKr = dataLists[0].explanatoryTextKr;
    this.publicationDate = dataLists[0].公表日;
    this.originalAuthorDeathDate = dataLists[0].原作者死亡日;
    this.protectionPeriod = dataLists[0].保護期間;
    this.aaHoldingInterest = dataLists[0].AA権保有持分;
    this.bbHoldingInterest = dataLists[0].BB権保有持分;
    this.ccHoldingInterest = dataLists[0].CC権保有持分;
    this.ddHoldingInterest = dataLists[0].DD権保有持分;
    this.eeHoldingInterest = dataLists[0].EE権保有持分;
    this.possessionNotes = dataLists[0].持ち分注意事項;
    this.videoUrl = dataLists[0].動画URL;
    this.otherNotes = dataLists[0].その他注意事項;
    this.Tag = dataLists[0].タグ;
    this.applicability = dataLists[0].掲載可否;
    this.applicabilityOnHomepage = dataLists[0].HPに掲載可否;
    this.rightsStartDate = dataLists[0].権利開始日;
    this.rightPeriod = dataLists[0].権利期間;
    this.Seller = dataLists[0].売却者;
    this.managementPublisher = dataLists[0].管理出版社;
    this.totalAmount = dataLists[0].数量;
    this.auctionStatus = dataLists[0].オークション状況;
    this.auctionStartDate = dataLists[0].オークション開始時間;
    this.auctionEndDate = dataLists[0].オークション終了時間;
    this.auctionAmount = dataLists[0].オークション数量;
    this.auctionStartPrice = dataLists[0].オークション開始金額;
    this.auctionEndPrice = dataLists[0].オークション落札金額;
    this.videoThumbnailUrl =
      "http://img.youtube.com/vi/" +
      dataLists[0].動画URL.split("v=")[1] +
      "/hqdefault.jpg";
    this.bidPrice = dataLists[0].オークション開始金額;

    var auctionLists = [];
    auctionLists = await this.$hexalink.getItems(
      this.token,
      this.applicationId,
      this.datastoreIds["オークション入札状況DB"],
      {
        conditions: [
          {
            id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
            search_value: ["著作権番号1"],
            exact_match: true // 完全⼀致で検索
          }
        ],
        page: 1,
        per_page: 9000,
        use_display_id: true
      }
    );
    console.log(auctionLists);

    var auctionListsGroupSort = auctionLists
      .reduce(function(result, current) {
        var element = result.find(function(p) {
          return p.入札金額 === current.入札金額;
        });
        if (element) {
          element.count++; // count
          element.数量 = Number(element.数量) + Number(current.数量); // sum
        } else {
          result.push({
            入札金額: current.入札金額,
            count: 1,
            数量: current.数量
          });
        }
        return result;
      }, [])
      .sort(function(a, b) {
        if (a.入札金額 < b.入札金額) {
          return 1;
        } else {
          return -1;
        }
      });

    var auctionAmountCount = 0;
    var orderOfArraivalFlag = true;

    Object.keys(auctionListsGroupSort).forEach(function(key) {
      auctionAmountCount += Number(auctionListsGroupSort[key].数量);
      if (auctionAmountCount <= dataLists[0].オークション数量) {
        auctionListsGroupSort[key].落札状況 = "落札";
        if (auctionAmountCount >= dataLists[0].オークション数量) {
          orderOfArraivalFlag = false;
        }
      } else if (orderOfArraivalFlag) {
        auctionListsGroupSort[key].落札状況 = "先着順の部分落札";
        orderOfArraivalFlag = false;
      } else {
        auctionListsGroupSort[key].落札状況 = "-";
      }
    });
    this.bidTotalAmount = auctionAmountCount;
    this.auctionListsGroup = auctionListsGroupSort;

    console.log(this.auctionListsGroup);
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    async doSend() {
      var setData = {};
      setData["著作権番号"] = "著作権番号1";
      setData["会員番号"] = "会員番号E";
      setData["数量"] = Number(this.bidAmount);
      setData["入札金額"] = Number(this.bidPrice);
      var param = {};
      param["item"] = setData;
      var result = await this.insertNewItem(
        this.datastoreIds["オークション入札状況DB"],
        param
      );
      console.log(result.data);
      this.closeModal();
    },
    // 新規Itemを作成します
    async insertNewItem(datasotreId, param) {
      const token = this.$store.getters["auth/getToken"];
      const applicationId = this.$store.getters["datas/getApplicationId"];
      var result = {};
      try {
        result = await this.$hexalink.createNewItem(
          token,
          applicationId,
          datasotreId,
          param
        );
      } catch {
        result = {};
      }
      return result;
    },
    async deleteItem(datasotreId, itemId) {
      // 削除処理作成
      const token = this.$store.getters["auth/getToken"];
      const applicationId = this.$store.getters["datas/getApplicationId"];

      return await this.$hexalink.deleteItem(
        token,
        applicationId,
        datasotreId,
        itemId
      );
    }
  }
};
</script>

<style scoped>
>>> .multi_option .option_tit span {
  display: inline-block;
  width: 33.3%;
  color: #888;
}
>>> li.multi_option {
  flex: 1;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  border: 1px solid #e6e3e3;
  font-size: 17px;
}
>>> .total {
  border-top: 1px solid #e6e3e3;
}
>>> .option_tit {
  border-bottom: 1px solid #e6e3e3;
  padding: 20px 32px;
}
>>> .multi_option > .option > ul > li {
  display: inline-block;
  width: 33.3%;
  padding: 16px 32px;
  vertical-align: middle;
  margin: 0;
}
>>> dl,
ul,
ol,
menu,
li {
  list-style: none;
}
>>> input {
  background-color: transparent;
  border-style: inset;
}
.bid_button {
  display: block;
  background-color: #e62f47;
  padding: 10px;
  color: #fff;
  text-align: center;
  font-weight: 700;
}
.song_detail .lst_bul dl {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.box_gray {
  border-radius: 8px;
  background-color: #f7f5f5;
  padding: 20px;
  font-size: 14px;
}
</style>
