import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import Top from "../../views/Top.vue";
import Signin from "../../views/Signin.vue";
import AuctionList from "../../views/AuctionList.vue";
import AuctionBid from "../../views/AuctionBid.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "top",
    component: Top,
    meta: { requiresAuth: true }
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/auctionlist",
    name: "Auctionlist",
    component: AuctionList
  },
  {
    path: "/auctionbid",
    name: "AuctionBid",
    component: AuctionBid,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 未認証の場合はログイン画面へ
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    console.log(next.name);
    if (Store.getters["auth/getStatus"]) {
      // 認証済み
      next();
    } else {
      next({ name: "signin" });
    }
  } else {
    next();
  }
});

export default router;
