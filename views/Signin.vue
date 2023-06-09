<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox">
      <h1 class="contents_title">
        <span class="contents_title-en">Login</span>
        <span class="contents_title-jp">ログイン</span>
      </h1>
      <div v-if="errorMess != ''" class="error_msg">
        <v-alert text color="red">
          {{ errorMess }}
        </v-alert>
      </div>
      <v-form>
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
          <validation-provider
            ref="password"
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              placeholder="パスワード"
              :error-messages="errors"
              required
              @click:append="show1 = !show1"
            />
          </validation-provider>
        </ValidationObserver>
      </v-form>
      <div class="loginBox_footer">
        <!-- <v-checkbox v-model="checkbox" label="ログイン状態を保持"></v-checkbox> -->
        <button type="submit" class="button-action" @click="signin">
          ログイン
        </button>
        <ul class="loginBox_link">
          <li>
            <router-link to="/forgotpassword">
              パスワードを忘れたかた
            </router-link>
          </li>
          <li>
            <router-link to="/registration">
              新規登録
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
      email: "",
      password: "",
      errorMess: "",
      show1: false
    };
  },
  /**
   * 初期作成
   */
  created: async function() {
    if (this.$store.getters["auth/getToken"]) {
      // 認証済み
      this.$router.push("/");
    }
    this.$store.commit("common/setLoading", false);
  },
  methods: {
    click() {
      alert("click!");
    },
    async signin() {
      this.errorMess = "";
      // loading overlay表示
      this.$store.commit("common/setLoading", true);

      try {
        // バリデーションの実装
        if (!this.$refs.signin.validate()) {
          throw "バリデーションエラー";
        }
        // Authトークンの取得
        const token = await this.$hexalink.login(this.email, this.password);

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
        const applicationId = applications.find(
          application =>
            application.display_id === window.env.VUE_APP_APPLICATION_ID
        ).application_id;
        const datastores = applications.find(
          application =>
            application.display_id === window.env.VUE_APP_APPLICATION_ID
        ).datastores;

        let datastoreIds = {};
        datastores.forEach(datastore => {
          datastoreIds[datastore.name] = datastore.datastore_id;
        });

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
        const memberStatus = userMaster.ステータス;
        if (memberStatus === "凍結中") {
          this.errorMess = `あなたのアカウントは凍結しました。
                            アカウントの確認についてはお問い合わせください。`;
          this.$store.commit("auth/stateInit");
          this.$store.commit("datas/stateInit");
          this.$store.commit("user/stateInit");
          return;
        }
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
        this.$store.commit("user/setMemberStatus", memberStatus);
        this.$store.commit("datas/setDatastoreIds", datastoreIds);
        this.$store.commit("datas/setFields", fields);
        this.$router.replace(this.$route.query.redirect || "/");
        // this.$router.push("/");
      } catch (e) {
        const { status, statusText } = e.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
        if (this.$refs.signin.validate()) {
          if (status === 423) {
            this.errorMess =
              "パスワードがロックされました。5分後に再度お試しください。";
          } else {
            this.errorMess = "メールアドレスもしくはパスワードが違います。";
          }
        }
      } finally {
        this.$store.commit("common/setLoading", false);
      }
    }
  }
};
</script>
