<template>
  <div id="page_notFound" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">404 Page not found</h2>
        </div>
      </div>
    </header>
    <section class="notFound">
      <div class="content">
        <h3 class="notFound_title">ご指定のページは見つかりませんでした。</h3>
        <div class="notFound_link">
          <router-link to="/" class="button-main">
            Hexabid トップページへ
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
