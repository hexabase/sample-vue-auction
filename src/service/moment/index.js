/**
 * 日付操作関連
 */
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Tokyo");

export default {
  install(Vue) {
    Vue.prototype.$moment = {
      format2Ymd(value) {
        let r = "";
        if (value) {
          r = moment(value, "YYYY年MM月DD日").format("YYYY-MM-DD");
        }
        return r;
      },
      format2YmdJP(value) {
        let r = "";
        if (value) {
          r = moment(value, "YYYY年MM月DD日").format("YYYY年MM月DD日");
        }
        return r;
      },
      format2Iso(value) {
        let r = "";
        if (value) {
          r = moment(value, "YYYY年MM月DD日").format();
        }
        return r;
      }
    };
  }
};
