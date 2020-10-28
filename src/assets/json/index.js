import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import common from "@/store/common";
import auth from "@/store/auth";
import datas from "@/store/datas";
import input from "@/store/input";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    auth,
    datas,
    input,
    approval
  },
  plugins: [
    createPersistedState({
      key: "",
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 7, secure: true }), //7日間有効
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
});
