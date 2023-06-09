import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hexalink from "./service/hexalink";
import sendgrid from "./service/sendgrid";
import moment from "./service/moment";
import sanitizeHTML from "sanitize-html";
import JsonCSV from "vue-json-csv";

import "./assets/css/loading.css";
import vuetify from "./plugins/vuetify";
import validate from "./service/validation";

import VueAzureUploader from "vue-azure-blob-upload";

require("./assets/scss/styles.scss");

Vue.use(hexalink);
Vue.use(validate);
Vue.use(sendgrid);
Vue.use(moment);
Vue.use(VueAzureUploader);
Vue.config.productionTip = false;
Vue.prototype.$sanitize = sanitizeHTML;
Vue.component("downloadCsv", JsonCSV);
//workspaceNameの指定が必要です。
Vue.prototype.$workspaceName = window.env.VUE_APP_WORKSPACE_NAME;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
