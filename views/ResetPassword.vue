<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox">
      <h1 class="contents_title">
        <span class="contents_title-single">パスワード再設定</span>
      </h1>
      <p v-if="!confirmUserFlag" class="loginBox_lead">
        新しいパスワードを入力してください。
      </p>
      <div v-if="errorMess != ''" class="error_msg">
        <v-alert text color="red">
          {{ errorMess }}
          <!-- MEMO: 200レスポンスエラー種類：
          ・!res.data の場合
           「リクエストを検証できませんでした」
          ・res.data.accessed === true の場合
           「既に使用済みのリンクです。再度「パスワードを忘れた方」のリンクをクリックしてください。」
          ・res.data.isElapsed === true の場合
           「リンクの有効期限が切れています。再度「パスワードを忘れた方」のリンクをクリックしてください。」 -->
        </v-alert>
      </div>
      <v-form v-if="!confirmUserFlag">
        <ValidationObserver ref="signin" v-slot="{}">
          <validation-provider
            ref="password"
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
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
          <validation-provider
            ref="password2"
            v-slot="{ errors }"
            name="パスワード(確認)"
            rules="required"
          >
            <v-text-field
              v-model="rePassword"
              placeholder="パスワード(確認)"
              :error-messages="errors"
              required
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              hint="※確認のためパスワードを再入力してください"
              @click:append="show2 = !show2"
            />
          </validation-provider>
        </ValidationObserver>
      </v-form>
      <div v-if="confirmUserFlag" class="loginBox_complete">
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        <p class="loginBox_lead">
          新しいパスワードを設定しました！<br />ログイン画面に移動します...
        </p>
      </div>
      <div v-if="!confirmUserFlag" class="loginBox_footer">
        <button
          type="submit"
          class="button-action"
          :disabled="disabled"
          @click="setNewPassword"
        >
          パスワードを設定
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
      email: "",
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
  },
  methods: {
    async setNewPassword() {
      const param = {
        new_password: this.password, //必須 新規作成パスワード 例：test
        confirm_password: this.rePassword, //必須 確認用パスワード 例：test この値は新規作成の値と同じでなければならない
        id: this.confirmationId //必須 パスワード初期化開始のapi送信後にemailのリンク内部に埋め込まれた情報をここに入れる
      };
      // パスワード判定
      if (
        !(this.password.match(/[A-Za-z]/g) && this.password.match(/[0-9]/g)) ||
        !this.password.match(/^[A-Za-z0-9]*$/) ||
        this.password.length < 8 ||
        this.password.length > 20
      ) {
        this.errorMess =
          "パスワードは8~20文字の半角英数の組み合わせで入力してください";
        return;
      }
      if (this.password === this.rePassword) {
        try {
          const setNewPassword = await this.$hexalink.setNewPassword(param);
          this.errorMess = "";
          this.confirmUserFlag = true;
        } catch (e) {
          this.errorMess = "パスワード変更中にエラーが発生しました。";
        }
      } else {
        this.errorMess = "確認パスワードが一致しません。";
      }
    }
  }
};
</script>
