<template>
  <div id="page_mypage" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">保有する楽曲権利</h2>
        </div>
      </div>
    </header>
    <img src="~@/assets/img/my_copyrights_02.jpg" alt="" />
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
        { text: "金額", value: "price" },
        { text: "その他所得税", value: "incometax" },
        { text: "地方所得税", value: "localincometax" },
        { text: "残高", value: "balance" }
      ],
      desserts: [
        {
          date: "2020/01/01",
          breakdown: "入金",
          title: "パラボラ",
          artist: "Officialヒゲ男dism",
          amount: "1",
          price: "100000",
          incometax: "0",
          localincometax: "0",
          balance: "0"
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
