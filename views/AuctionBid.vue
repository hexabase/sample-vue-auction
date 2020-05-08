<template>
  <div id="page_auction" data-role="page">
    <section class="musicInfo">
      <div class="content">
        <figure class="musicInfo_img">
          <img :src="videoThumbnailUrl" />
        </figure>
        <div class="musicInfo_wrap">
          <h2 class="musicInfo_title">{{ title }}</h2>
          <p class="musicInfo_artist">{{ singer1 }}</p>
          <p class="musicInfo_text">{{ explanatoryText }}</p>
          <table class="musicInfo_data">
            <tr>
              <th>残り時間</th>
              <th>オークション数量</th>
              <th>オークション開始価格<span>（1週、消費税を含む）</span></th>
            </tr>
            <tr>
              <td>{{ remainingTime || "Closed" }}</td>
              <td>
                {{ auctionAmount }}
                <span class="unit">株</span>
              </td>
              <td>
                {{ auctionStartPrice }}
                <span class="unit">円</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <section class="auctionInfo">
      <div class="content">
        <h2 class="auctionInfo_title">オークションの状況</h2>
        <div class="auctionInfo_wrap">
          <div class="auctionInfo_left">
            <table class="bidList">
              <thead>
                <tr>
                  <th>入札価格（1株）</th>
                  <th>入札数量</th>
                  <th>オークション結果</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="value in auctionListsGroup"
                  :key="value.入札金額"
                  class="option"
                >
                  <td>{{ value.入札金額 }} 円</td>
                  <td>{{ value.数量 }}</td>
                  <td>{{ value.落札状況 }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>合計</td>
                  <td class="bidList_total">{{ bidTotalAmount }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="auctionInfo_right">
            <section class="bidBox">
              <h3 class="bidBox_title">入札</h3>
              <div class="bidBox_field">
                <label>入札価格<span>（1週、消費税を含む）</span></label>
                <input
                  id="amount"
                  v-model="bidPrice"
                  type="text"
                  name="amount"
                  class="form-box"
                />
                <span class="bidBox_unit">円</span>
                <p class="note">※500円の倍数から入札可能です。</p>
              </div>
              <div class="bidBox_field">
                <label>入札数量</label>
                <input
                  id="cnt_units"
                  v-model="bidAmount"
                  type="text"
                  name="cnt_units"
                  class="form-box"
                />
              </div>
              <p class="bidBox_total">
                総入札価格（税込）：
                <span class="price">{{ bidPrice * bidAmount }}</span>
                円
              </p>
              <button class="button-action" @click="openModal">入札する</button>
            </section>
            <dl class="bidPolicy">
              <dt>参加規定</dt>
              <dd>
                5万円を超える入札時入札保証金（入札金の５％）が自動的に差し引かれます。<br />
                再入札時差額入札保証金が差し引か返されます。<br />
                入札最終日には、親の数量・上位金額の再入札のみ可能です。<br />
                最終未落札時入札保証金は、自動的に返されます。
              </dd>
              <dt>キャンセルポリシー</dt>
              <dd>
                入札キャンセル入札保証金は、私の財布に自動的に返されます。<br />
                入札最終日はキャンセルが不可で上位数量・上位金額の再入札のみ可能です。<br />
                落札後未入金などの理由で落札取り消しの際入札保証金は返されません。<br />
                私の入札価格に比べ、最近１年著作権料（％）<br />
                7.7％
              </dd>
              <dd>
                *住民登録番号を提供していただければ他の所得税最低限（取引単位あたり50,000円以下課税額なしで分離課税可能）を適用した源泉徴収業務をSYZYGYから代理して進めています。分離課税が適用されても、年間その他の所得が300万円を超過する場合には、お客様が全額を総合所得課税標準に加算することにより申告する必要がありする義務があります。
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <section class="trend">
      <div class="content">
        <h2 class="trend_title">最近の動向</h2>
        <section class="trend_barChart">
          <h3 class="trend_subTitle">最近5年間の著作権料（1週間あたり）</h3>
        </section>
        <section class="trend_royalty">
          <h3 class="trend_subTitle">
            最近12ヶ月のロイヤリティ（1週間あたり）
          </h3>
        </section>
      </div>
    </section>
    <section class="royaltyInfo">
      <div class="content">
        <h2 class="royaltyInfo_title">著作権情報</h2>
        <ul class="royaltyInfo_list">
          <li>
            <span class="royaltyInfo_label">公表日</span>
            2015-04-08
          </li>
          <li>
            <span class="royaltyInfo_label">歌手</span>
            徳永ゆうき（渋谷節だよ青春は！）
          </li>
          <li>
            <span class="royaltyInfo_label">作曲</span>
            徳永ゆうき
          </li>
          <li>
            <span class="royaltyInfo_label">作詞</span>
            徳永ゆうき
          </li>
          <li>
            <span class="royaltyInfo_label">編曲</span>
            徳永ゆうき
          </li>
          <li>
            <span class="royaltyInfo_label">著作権保護期間</span>
            原作者死後70年
          </li>
          <li>
            <span class="royaltyInfo_label">
              最近12ヶ月のロイヤリティ（1週間あたり）
            </span>
            1,116円
          </li>
          <li>
            <span class="royaltyInfo_label">最近12ヶ月の収益率</span>
            8％
          </li>
          <li>
            <span class="royaltyInfo_label">著作権信託</span>
            社団法人日本音楽著作権協会
          </li>
          <li>
            <span class="royaltyInfo_label">代表信託者</span>
            SYZYGY
          </li>
          <li>
            <span class="royaltyInfo_label">著作権株式</span>
            1 / 17,170<br />
            二次的著作物の作成巻（O）
          </li>
          <li>
            <span class="royaltyInfo_label">その他の主な事項</span>
            * KOMCAの管理範囲に該当する地域の著作権
          </li>
        </ul>
      </div>
    </section>
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
  </div>
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
