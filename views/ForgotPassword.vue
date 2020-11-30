<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox">
      <h1 class="contents_title">
        <span class="contents_title-single">パスワードを忘れた方</span>
      </h1>
      <p v-if="!sendResult" class="loginBox_lead">
        ご登録いただいているメールアドレスを入力し送信してください。<br />
        メールにてパスワード再設定をご案内します。
      </p>
      <div v-if="errorMess != ''" class="error_msg">
        <v-alert text color="red">
          {{ errorMess }}
        </v-alert>
      </div>
      <v-form v-if="!sendResult">
        <ValidationObserver ref="signin" v-slot="{}">
          <validation-provider
            ref="address"
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              type="text"
              placeholder="メールアドレス"
              :error-messages="errors"
              required
            />
          </validation-provider>
        </ValidationObserver>
      </v-form>
      <div v-if="sendResult" class="loginBox_complete">
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        <p class="loginBox_lead">
          パスワード変更用のメールを送信しました。<br />
          メールに記載されたURLからパスワードの再設定を行ってください。
        </p>
      </div>
      <div class="loginBox_footer">
        <button
          v-if="!sendResult"
          type="submit"
          class="button-action"
          @click="resetPassword"
        >
          送信する
        </button>
        <ul class="loginBox_link">
          <li>
            <router-link to="/">
              Topページに戻る
            </router-link>
          </li>
          <li>
            <router-link to="/signin">
              ログインする
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </v-row>
</template>

<script>
import common from "@/components/mixin/common";

export default {
  name: "Signin",
  mixins: [common],
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getHexaID"],
      email: "",
      password: "",
      errorMess: "",
      sendResult: ""
    };
  },
  /**
   * 初期作成
   */
  created: async function() {
    this.$store.commit("common/setLoading", false);
  },
  methods: {
    async resetPassword() {
      if (
        this.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        const confirmationId = await this.$hexalink.getConfirmations();
        let param = {
          email: this.email, //パスワードをリセットしたいユーザーのemail 必須
          host: "https://" + window.env.VUE_APP_BASEURL, //例：https://stg.xxxxxx.com 必須
          email_templates_id: window.env.VUE_APP_ET_ID,
          confirmation_id: confirmationId
        };
        this.sendResult = await this.$hexalink.resetPassword(param);
        this.errorMess = "";
      } else {
        this.errorMess = "メールアドレスを入力してください";
      }
    }
  }
};
</script>
