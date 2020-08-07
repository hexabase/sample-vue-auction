import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import Top from "../../views/Top.vue";
import Registration from "../../views/Registration.vue";
import Signup from "../../views/Signup.vue";
import Signin from "../../views/Signin.vue";
import AuctionList from "../../views/AuctionList.vue";
import ClosedAuction from "../../views/ClosedAuction.vue";
import AuctionBid from "../../views/AuctionBid.vue";
import Mypage from "../../views/Mypage.vue";
import MyCopyrights from "../../views/MyCopyrights.vue";
import UserInfo from "../../views/UserInfo.vue";
import NotFound from "../../views/NotFound.vue";
import Index from "../../views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    // Movie用仮ページ
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/",
    name: "top",
    component: Top,
    meta: { requiresAuth: true }
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/signup/:id",
    name: "signup",
    component: Signup
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
    path: "/closedauction",
    name: "ClosedAuction",
    component: ClosedAuction
  },
  {
    path: "/auctionbid/:id",
    name: "AuctionBid",
    component: AuctionBid,
    meta: { requiresAuth: true }
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage
  },
  {
    path: "/mycopyrights",
    name: "MyCopyrights",
    component: MyCopyrights
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: UserInfo
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
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
