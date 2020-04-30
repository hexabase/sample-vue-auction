import axios from "axios";

const defaultConfig = {
  headers: {
    "content-type": "application/json"
  }
};

export default {
  install(Vue) {
    Vue.prototype.$sendgrid = {
      /**
       * @param {*} params
       * @returns
       */
      async sendMail(params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        // ここでSendGridのAPIキーを指定
        const token =
          "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";
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(`/sendgrid/mail/send`, params, config);
        return result;
      }
    };
  }
};
