import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import Top from "../../views/Top.vue";
import Registration from "../../views/Registration.vue";
import Signup from "../../views/Signup.vue";
import ForgotPassword from "../../views/ForgotPassword.vue";
import ResetPassword from "../../views/ResetPassword.vue";
import UpdateEmail from "../../views/updateEmail.vue";
import Signin from "../../views/Signin.vue";
import AuctionList from "../../views/AuctionList.vue";
import ClosedAuction from "../../views/ClosedAuction.vue";
import AuctionBid from "../../views/AuctionBid.vue";
import Trade from "../../views/Trade.vue";
import Mypage from "../../views/Mypage.vue";
import MyCopyrights from "../../views/MyCopyrights.vue";
import MyBidAuction from "../../views/MyBidAuction.vue";
import Wallet from "../../views/Wallet.vue";
import UserInfo from "../../views/UserInfo.vue";
import Contact from "../../views/Contact.vue";
import Faq from "../../views/Faq.vue";
import News from "../../views/News.vue";
import Solicitation from "../../views/Solicitation.vue";
import Privacy from "../../views/Privacy.vue";
import Antisocial from "../../views/Antisocial.vue";
import Terms from "../../views/Terms.vue";
import NotFound from "../../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
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
    path: "/updateemail/:id",
    name: "UpdateEmail",
    component: UpdateEmail,
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
    path: "/mybidauction",
    name: "MyBidAuction",
    component: MyBidAuction,
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
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/solicitation",
    name: "Solicitation",
    component: Solicitation
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/antisocial",
    name: "Antisocial",
    component: Antisocial
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms
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
      next({ name: "signin", query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
