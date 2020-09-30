import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import Top from "../../views/Top.vue";
import Registration from "../../views/Registration.vue";
import Signup from "../../views/Signup.vue";
import ForgotPassword from "../../views/ForgotPassword.vue";
import ResetPassword from "../../views/ResetPassword.vue";
import Signin from "../../views/Signin.vue";
import AuctionList from "../../views/AuctionList.vue";
import ClosedAuction from "../../views/ClosedAuction.vue";
import AuctionBid from "../../views/AuctionBid.vue";
import Trade from "../../views/Trade.vue";
import Mypage from "../../views/Mypage.vue";
import MyCopyrights from "../../views/MyCopyrights.vue";
import Wallet from "../../views/Wallet.vue";
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
    component: Top
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
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword
  },
  {
    path: "/reset_password/:id",
    name: "ResetPassword",
    component: ResetPassword
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
    component: AuctionBid
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
    meta: { requiresAuth: true }
  },
  {
    path: "/mycopyrights",
    name: "MyCopyrights",
    component: MyCopyrights,
    meta: { requiresAuth: true }
  },
  {
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
    meta: { requiresAuth: true }
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: UserInfo,
    meta: { requiresAuth: true }
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
