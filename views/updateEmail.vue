<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox updateEmail">
      <h1 class="contents_title">
        <span class="contents_title-single">メールアドレスの確認</span>
      </h1>
      <div v-if="errorMess != ''" class="error_msg">
        <v-alert text color="red">
          {{ errorMess }}
        </v-alert>
      </div>
      <p v-if="!confirmUserFlag" class="loginBox_lead">
        このメールアドレスに変更してよろしいですか。
      </p>
      <p class="updateEmail_mail">{{ tmpEmail }}</p>
      <v-form v-if="!confirmUserFlag">
        <ValidationObserver ref="signin" v-slot="{}">
          <validation-provider
            ref="password"
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <p class="updateEmail_text">
              ※セキュリティのためパスワードを入力してください
            </p>
            <v-text-field
              v-model="password"
              placeholder="パスワード"
              :error-messages="errors"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
          </validation-provider>
        </ValidationObserver>
      </v-form>
      <div v-if="confirmUserFlag" class="loginBox_complete">
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        <p class="loginBox_lead">
          メールアドレスを変更しました。<br />ログイン画面に移動します...
        </p>
      </div>
      <div v-if="!confirmUserFlag" class="loginBox_footer">
        <button
          type="submit"
          class="button-action"
          :disabled="disabled"
          @click="updateUserEmail"
        >
          変更する
        </button>
      </div>
    </div>
  </v-row>
</template>

<script>
import common from "@/components/mixin/common";
import moment from "moment";

export default {
  name: "Signin",
  mixins: [common],
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      email: this.$store.getters["user/getEmail"],
      tmpEmail: "",
      userName: "",
      password: "",
      rePassword: "",
      errorMess: "",
      show1: false,
      show2: false,
      getConfirmUserData: {},
      confirmationId: "",
      confirmUserFlag: false,
      disabled: false
    };
  },
  /**
   * 初期作成
   */
  created: async function() {
    this.$store.commit("common/setLoading", false);
    this.confirmationId = this.$route.params.id;
    try {
      this.getConfirmUserData = await this.$hexalink.confirmUserEmail(
        this.token,
        this.confirmationId
      );
      this.tmpEmail = this.getConfirmUserData.data.user.tmp_email;
    } catch (e) {
      this.errorMess = "ユーザ確認中にエラーが発生しました。";
      this.disabled = true;
    }
  },
  methods: {
    async updateUserEmail() {
      let token = "";
      try {
        token = await this.$hexalink.login(this.email, this.password);
      } catch {
        this.errorMess = "パスワードが一致しません。";
      }
      if (token) {
        const param = {
          confirmation_id: this.confirmationId
        };
        try {
          this.$store.commit("common/setLoading", true);
          const updateUserEmailResult = await this.$hexalink.updateUserEmail(
            this.token,
            param
          );
          this.confirmUserFlag = true;
          await this.$hexalink.logout(this.token);
          setTimeout(() => {
            // store 初期化
            this.$store.commit("auth/stateInit");
            this.$store.commit("datas/stateInit");
            this.$store.commit("user/stateInit");
            this.$store.commit("common/setLoading", false);
            this.$router.push("/signin");
          }, 3000);
        } catch (e) {
          this.errorMess = "メールアドレス変更中にエラーが発生しました。";
          this.disabled = true;
          this.$store.commit("common/setLoading", false);
        }
      }
    }
  }
};
</script>
