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
          <p class="balance_price">100000</p>
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
            <dd></dd>
            <dt>照会内容</dt>
            <dd></dd>
            <dt>検索順序</dt>
            <dd></dd>
          </dl>
          <button class="button-main">照会する</button>
        </div>
        <div class="transaction_result">
          <table class="transaction_list">
            <thead>
              <th>リクエスト日</th>
              <th>内訳</th>
              <th>曲名</th>
              <th>歌手</th>
              <th>数量</th>
              <th>金額</th>
              <th>その他所得税</th>
              <th>地方所得税</th>
              <th>残高</th>
            </thead>
            <tbody>
              <td>2020/01/10</td>
              <td>全体</td>
              <td>パラボラ</td>
              <td>Official髭男dism</td>
              <td>1</td>
              <td>10000 円</td>
              <td>1000 円</td>
              <td>500 円</td>
              <td>100000 円</td>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created: async function() {},
  mounted: function() {},
  methods: {}
};
</script>

<style scoped></style>
