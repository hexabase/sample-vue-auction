<template>
  <div id="page_mypage" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">マイページ</h2>
        </div>
      </div>
    </header>
    <section class="balance">
      <div class="content">
        <h3 class="balance_title">残高</h3>
        <div class="balance_box">
          <p class="balance_price">100,000</p>
          <ul class="balance_link">
            <li>
              <button class="button-action">＋&nbsp;入金する</button>
            </li>
            <li>
              <button class="button-action">−&nbsp;出金する</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="transaction">
      <div class="content">
        <h3 class="transaction_title">取引の詳細</h3>
        <div class="transaction_search">
          <dl class="transaction_search_list">
            <dt>照会期間</dt>
            <dd>
              <!-- <FormCalendar></FormCalendar> -->
              <v-text-field
                type="date"
                outlined
                single-line
                hint="照会開始日"
              ></v-text-field>
              〜
              <v-text-field
                type="date"
                outlined
                single-line
                value="2020-03-03"
                hint="照会終了日"
              ></v-text-field>
              <v-btn-toggle v-model="period" rounded borderless>
                <v-btn>当日</v-btn>
                <v-btn>１週間</v-btn>
                <v-btn>１ヶ月</v-btn>
                <v-btn>３ヶ月</v-btn>
                <v-btn>６ヶ月</v-btn>
              </v-btn-toggle>
            </dd>
            <dt>照会内容</dt>
            <dd>
              <v-radio-group v-model="searchTarget" row>
                <v-radio label="全体" value="all"></v-radio>
                <v-radio label="入金内容のみ" value="in"></v-radio>
                <v-radio label="出金内容のみ" value="out"></v-radio>
              </v-radio-group>
              <v-select :items="searchTargetItems" outlined></v-select>
            </dd>
            <dt>検索順序</dt>
            <dd>
              <v-radio-group v-model="searchOrder" row>
                <v-radio label="最近の取引履歴が上" value="0"></v-radio>
                <v-radio label="過去の取引履歴を上" value="1"></v-radio>
              </v-radio-group>
            </dd>
          </dl>
          <button class="button-main">照会する</button>
        </div>
        <div
          class="transaction_result"
          @click="$router.push('/auctionbid?id=著作権番号2')"
        >
          <template>
            <v-data-table
              :headers="transactionHeaders"
              :items="desserts"
              :items-per-page="5"
              class="transaction_list"
            ></v-data-table>
          </template>
        </div>
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
      period: 4,
      searchTarget: "",
      searchTargetItems: ["全体", "あああ"],
      searchOrder: "",
      transactionHeaders: [
        { text: "リクエスト日", value: "date" },
        { text: "内訳", value: "breakdown" },
        { text: "曲名", value: "title" },
        { text: "歌手", value: "artist" },
        { text: "数量", value: "amount" },
        { text: "金額", value: "price", align: "right" },
        { text: "その他所得税", value: "incometax", align: "right" },
        { text: "地方所得税", value: "localincometax", align: "right" },
        { text: "残高", value: "balance", align: "right" }
      ],
      desserts: [
        {
          date: "2020/05/20",
          breakdown: "入札",
          title: "パラボラ",
          artist: "Officialヒゲ男dism",
          amount: "10",
          price: "100,000",
          incometax: "0",
          localincometax: "0",
          balance: "900,000"
        },
        {
          date: "2020/05/02",
          breakdown: "出金",
          title: "",
          artist: "",
          amount: "",
          price: "-410,000",
          incometax: "0",
          localincometax: "0",
          balance: "1,000,000"
        },
        {
          date: "2020/04/18",
          breakdown: "入札",
          title: "プロローグ",
          artist: "Uru",
          amount: "1",
          price: "-100,000",
          incometax: "0",
          localincometax: "0",
          balance: "1,410,000"
        },
        {
          date: "2020/03/30",
          breakdown: "配当",
          title: "パプリカ",
          artist: "米津玄師",
          amount: "100",
          price: "10,000",
          incometax: "1500",
          localincometax: "500",
          balance: "1,510,000"
        },
        {
          date: "2020/02/08",
          breakdown: "売却",
          title: "パプリカ",
          artist: "米津玄師",
          amount: "50",
          price: "200,000",
          incometax: "3,000",
          localincometax: "1,000",
          balance: "1,500,000"
        }
      ]
    };
  },
  created: async function() {},
  mounted: function() {},
  methods: {}
};
</script>

<style scoped></style>
