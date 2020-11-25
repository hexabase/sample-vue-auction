<template>
  <footer class="siteFooter" role="contentinfo">
    <div class="content">
      <h2 class="siteFooter_logo">
        <a href="/">
          <img
            src="~@/assets/img/logo-w.png"
            alt="BATON Marketplace for music royalty"
          />
        </a>
      </h2>
      <ul class="siteFooter_nav" role="navigation">
        <li class="siteFooter_nav-link">
          <router-link to="/">
            運営会社
          </router-link>
        </li>
        <li class="siteFooter_nav-link">
          <router-link to="/solicitation">
            勧誘方針
          </router-link>
        </li>
        <li class="siteFooter_nav-link">
          <router-link to="/privacy">
            プライバシーポリシー
          </router-link>
        </li>
        <li class="siteFooter_nav-link">
          <router-link to="/antisocial">
            反社会的勢力への対応に関する基本方針
          </router-link>
        </li>
        <li class="siteFooter_nav-link">
          <router-link to="/terms">
            利用規約
          </router-link>
        </li>
        <li class="siteFooter_nav-link">
          <router-link to="/contact">お問い合わせ</router-link>
        </li>
      </ul>
      <dl class="siteFooter_company-info">
        <dt>SYZYGY株式会社</dt>
        <dd>第二種金融商品取引業者&nbsp;&nbsp;関東財務局長（金商）第●号</dd>
        <dd>加入協会：一般社団法人第二種金融商品取引業協会</dd>
      </dl>
      <small class="siteFooter_copy">
        Copyright 2020 BATON All Rights Reserved.
      </small>
    </div>
  </footer>
</template>
