<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox">
      <h1 class="contents_title">
        <span class="contents_title-en">Sign Up</span>
        <span class="contents_title-jp">新規会員登録</span>
      </h1>
      <p v-if="!confirmUserFlag" class="loginBox_lead">
        {{ email }}のメールアドレスで<br />
        Hexabidのアカウントを作成します。<br />
        ユーザー名とパスワードを決めてください。
      </p>
      <div v-if="errorMess != ''" class="error_msg">
        <v-alert text color="red">
          {{ errorMess }}
        </v-alert>
      </div>
      <v-form v-if="!confirmUserFlag">
        <ValidationObserver ref="signin" v-slot="{}">
          <validation-provider
            ref=""
            v-slot="{ errors }"
            name="ユーザー名"
            rules="required|doubleCount:10"
          >
            <v-text-field
              v-model="userName"
              type="text"
              placeholder="ユーザー名"
              :counter="10"
              :error-messages="errors"
              required
              hint="※あとから変更できます"
            />
          </validation-provider>
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
        <p class="loginBox_lead">登録完了しました！Hexabidに移動します...</p>
      </div>
      <div v-if="!confirmUserFlag" class="loginBox_footer">
        <button
          type="submit"
          class="button-action"
          :disabled="disabled"
          @click="getConfirmUser"
        >
          登録する
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
      token: this.$store.getters["auth/getToken"], //ここは共通Tokenに書き換える
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
    try {
      this.getConfirmUserData = await this.$hexalink.getConfirmUserData(
        this.confirmationId
      );
      this.email = this.getConfirmUserData.data.user.email;
    } catch (e) {
      this.errorMess = "ユーザ確認中にエラーが発生しました。";
      this.disabled = true;
    }
  },
  methods: {
    click() {
      alert("click!");
    },
    async getConfirmUser() {
      if (!this.userName) {
        this.errorMess = "ユーザ名が入力されていません";
        return;
      }
      if (this.userName.length > 10) {
        this.errorMess = "ユーザ名は10文字以内で入力してください";
        return;
      }
      if (!this.password) {
        this.errorMess = "パスワードが入力されていません";
        return;
      }
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
      if (this.password !== this.rePassword) {
        this.errorMess = "確認用パスワードが一致していません";
        return;
      }
      const params = {
        confirmation_id: this.confirmationId,
        workspace: "required",
        email: this.getConfirmUserData.data.user.email,
        username: this.userName,
        password: this.password
      };
      const confirmUser = await this.$hexalink.confirmUser(params);
      if (confirmUser.status == 200) {
        this.confirmUserFlag = true;
        // ログイン処理
        await this.signin(confirmUser.data.token);
      } else {
        this.errorMess = "登録エラーが発生しました。";
      }
    },
    async signin(token) {
      this.errorMess = "";
      try {
        // バリデーションの実装
        if (!this.$refs.signin.validate()) {
          throw "バリデーションエラー";
        }

        // Hexalink UserInfoの取得
        const userInfo = await this.$hexalink.getUserInfo(token);

        // workspaceの取得
        const workspaces = await this.$hexalink.getWorkspaces(token);
        const workspaceId = this.getWorkSpaceId(workspaces);

        // applicationの取得
        const applications = await this.$hexalink.getApplications(
          token,
          workspaceId
        );
        const applicationId = applications[0].application_id;
        const datastores = applications[0].datastores;

        let datastoreIds = {};
        datastores.forEach(datastore => {
          datastoreIds[datastore.name] = datastore.datastore_id;
        });

        // ユーザDB登録処理
        let setData = {};
        setData["hexaID"] = userInfo.data.u_id;
        setData["ユーザ名"] = this.userName;
        setData["Email"] = this.getConfirmUserData.data.user.email;
        setData["加入日"] = moment();

        let userDBparam = {};
        userDBparam["item"] = setData;
        const insertResult = await this.insertNewItem(
          window.env.table.VUE_APP_USERINFOTABLE_ID,
          userDBparam,
          token
        );

        // ユーザ名の取得
        const userName = await this.$hexalink.getCurrentUserName(token);
        var params = {
          conditions: [
            {
              id: "hexaID",
              search_value: [userInfo.data.u_id],
              exact_match: true
            }
          ],
          page: 1,
          per_page: 1,
          use_display_id: true,
          sort_field_id: "created_at",
          sort_order: "desc"
        };
        var userMasters = await this.$hexalink.getItems(
          token,
          applicationId,
          window.env.table.VUE_APP_USERINFOTABLE_ID,
          params
        );
        var userMaster = "";
        if (userMasters.length > 0) {
          userMaster = userMasters[0];
        }
        const userNameKanji = userMaster.ユーザ名;
        const userID = userMaster.ユーザID;
        const userMail =
          userMaster.メールアドレス == undefined
            ? userInfo.data.email
            : userMaster.メールアドレス;
        const hexaID =
          userMaster.userID == undefined
            ? userInfo.data.u_id
            : userMaster.userID;
        const membershipNumber = userMaster.会員番号;
        // フィールド一覧の取得
        let datastoreList = [];
        let getFieldPromise = [];
        datastores.forEach(datastore => {
          datastoreList.push(datastore.display_id);
          getFieldPromise.push(
            this.$hexalink.getFields(
              token,
              applicationId,
              datastore.datastore_id
            )
          );
        });
        let fields = {};
        const fieldRawDatas = await Promise.all(getFieldPromise);
        datastoreList.forEach((display_id, index) => {
          fields[display_id] = {};
          Object.keys(fieldRawDatas[index]).forEach(fieldId => {
            fields[display_id][
              fieldRawDatas[index][fieldId].display_id
            ] = fieldId;
          });
        });
        // storeに格納
        this.$store.commit("auth/setToken", token);
        this.$store.commit("auth/setStatus", true);
        this.$store.commit("auth/setUserName", userName);
        this.$store.commit("auth/setUserNameKanji", userNameKanji);
        this.$store.commit("datas/setWorkspaceId", workspaceId);
        this.$store.commit("datas/setApplicationId", applicationId);
        this.$store.commit("datas/setDatastores", datastores);
        this.$store.commit("user/setId", userID);
        this.$store.commit("user/setName", userNameKanji);
        this.$store.commit("user/setEmail", userMail);
        this.$store.commit("user/setHexaID", hexaID);
        this.$store.commit("user/setMembershipNumber", membershipNumber);
        this.$store.commit("datas/setDatastoreIds", datastoreIds);
        this.$store.commit("datas/setFields", fields);
        this.$router.push("/");
      } catch (e) {
        this.errorMess = "ログイン処理中にエラーが発生しました。";
      }
    },
    // 新規Itemを作成します
    async insertNewItem(datasotreId, param, token) {
      var result = {};
      try {
        result = await this.$hexalink.createNewItem(
          token,
          window.env.VUE_APP_APPLICATION_ID,
          datasotreId,
          param
        );
      } catch {
        result = {};
      }
      return result;
    }
  }
};
</script>
