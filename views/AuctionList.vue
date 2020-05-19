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
            v-for="(x, index) in sample"
            :key="index"
            class="auctionList_item"
          >
            <figure class="auctionList_item_img">
              <img src="https://higedanparabora.com/img/jkt-parabora.jpg" />
            </figure>
            <h3 class="auctionList_item_title">パラボラ</h3>
            <p class="auctionList_item_artist">Official髭男dism</p>
            <dl class="auctionList_item_info">
              <dt>最高値</dt>
              <dd>10000<span class="unit">円（年2.2%）</span></dd>
              <dt>スタート金額</dt>
              <dd>3000<span class="unit">円（年2.2%）</span></dd>
              <dt>競争率</dt>
              <dd>99<span class="unit">%</span></dd>
            </dl>
            <button class="button-action">入札する</button>
          </article>
        </div>
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sample: [1, 2, 3],
      page: 1
    };
  },
  created: async function() {},
  mounted: function() {},
  methods: {}
};
</script>

<style scoped></style>
