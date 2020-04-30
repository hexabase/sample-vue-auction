import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import common from "@/store/common";
import auth from "@/store/auth";
import datas from "@/store/datas";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    auth,
    datas
  },
  plugins: [
    createPersistedState({
      key: "",
      storage: window.sessionStorage
    })
  ]
});
