<template>
  <div id="page_myCopyrights" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">保有する楽曲権利</h2>
        </div>
      </div>
    </header>
    <section class="trend">
      <div class="content">
        <h2 class="trend_title">取引の詳細</h2>
        <p class="trend_lead">保有著作権と著作権料をチェックしてください</p>
        <div class="trend_wrap">
          <section class="trend_barChart">
            <h3 class="trend_subTitle">最近5年間の著作権料（1週間あたり）</h3>
            <img src="~@/assets/img/auction-detail-graph1.png" alt="" />
          </section>
          <section class="trend_royalty">
            <h3 class="trend_subTitle">
              投資総額
            </h3>
            <dl class="trend_totalList">
              <dt>累積購入金額</dt>
              <dd>500,000 円</dd>
              <dt>累積販売金額</dt>
              <dd>3,000 円</dd>
              <dt>累積著作権料収入</dt>
              <dd>80,000 円</dd>
              <dt>現在保有している著作権の購入額合計</dt>
              <dd>300,000 円</dd>
            </dl>
          </section>
        </div>
      </div>
      <v-tabs hide-slider class="tabMenu">
        <v-tab :to="{ name: 'MyCopyrights' }" class="tabMenu_tabItem">
          保有中
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          販売中
        </v-tab>
        <v-tab :to="{ name: 'ClosedAuction' }" class="tabMenu_tabItem">
          購入の著作権
        </v-tab>
      </v-tabs>
    </section>
    <section class="myCopyright">
      <div class="content">
        <h2 class="myCopyright_title">保有中の著作権</h2>
        <p class="myCopyright_lead">
          販売したい曲がありましたら、その曲をクリックしてください
        </p>
        <div class="myCopyright_wrap">
          <article class="myCopyright_item">
            <figure class="myCopyright_item_img">
              <img
                src="https://m.media-amazon.com/images/I/71L4atTJQhL._SS500_.jpg"
              />
            </figure>
            <div class="myCopyright_item_content">
              <h3 class="myCopyright_item_title">
                パラボラ
              </h3>
              <p class="myCopyright_item_artist">
                Officialヒゲ男dism
              </p>
              <p class="myCopyright_item_date">
                終了：2020年04月07日
              </p>
              <button class="button-action" @click="console.log('あとで')">
                販売
              </button>
            </div>
          </article>
          <article class="myCopyright_item">
            <figure class="myCopyright_item_img">
              <img
                src="https://m.media-amazon.com/images/I/71L4atTJQhL._SS500_.jpg"
              />
            </figure>
            <div class="myCopyright_item_content">
              <h3 class="myCopyright_item_title">
                パラボラ
              </h3>
              <p class="myCopyright_item_artist">
                Officialヒゲ男dism
              </p>
              <p class="myCopyright_item_date">
                終了：2020年04月07日
              </p>
              <button class="button-action" @click="console.log('あとで')">
                販売
              </button>
            </div>
          </article>
        </div>
        <v-pagination v-model="page" :length="5"></v-pagination>
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
      page: 1
    };
  },
  created: async function() {},
  mounted: function() {},
  methods: {}
};
</script>

<style scoped></style>
