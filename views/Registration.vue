<template>
  <v-row align="center" justify="center" class="login">
    <div class="loginBox">
      <h1 class="contents_title">
        <span class="contents_title-en">Join BATON!</span>
        <span class="contents_title-jp">新規会員登録</span>
      </h1>
      <p v-if="!sendResult" class="loginBox_lead">
        登録URLをメールで通知します。<br />
        BATONで利用するメールアドレスを入力し<br class="hide-mobile" />
        送信してください。
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
          {{ email }}宛に登録URLを送信しました。<br />
          メールをご確認ください。
        </p>
      </div>
      <div v-if="!sendResult" class="loginBox_footer">
        <button type="submit" class="button-action" @click="inviteUser">
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
import mapping from "@/assets/json/auctionDBMapping.json";

export default {
  name: "Signin",
  mixins: [common],
  data() {
    return {
      // token: this.$store.getters["auth/getToken"],
      token:
        "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1NDU4Nzk3NjcsImlhdCI6MTU5OTc5OTc2Nywic3ViIjoiNWU5Njc5ODhmNDE3MTEwMDA2ZTczMGJmIiwidW4iOiIifQ.gZDQqrVXa2mOlMDjk2cJ6FEsEYDpVb4JDYBEQiVvXGD7TXC9AuiRlpLfCtqiKw5cxMxOeKBr91LCS1QfiT03ZwSBlmZldPBuMFZFNj3vtsye3GvgHad7oVXRP5xWE0lP32Q8h7Gkqhg2Hzhwpe1qQKyQDV8kV0CIvPolgNLWE7ypeO0jBuaykAn9jxr0xIr1k4kjtrhPf4fZSPzz_r45GK7Yury13bSzxXtrVk7KbBtCkLl7QyM-uskJoSQ_Sk_vYJeCB0hm_worw7PdK4kXivyMcblOyzQa7frEOgjadRH1Njd4O7DtQDeZL0nrNAR-EGreE9RnDEoDoNuOYWrEvA",
      mapping: JSON.parse(JSON.stringify(mapping)),
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
    click() {
      alert("click!");
    },
    async getUserDB(email) {
      console.log(this.token);
      return await this.$hexalink.getItems(
        this.token,
        this.mapping.applicationId,
        "5ef2f6d9f2d7d2000680b3b1",
        {
          conditions: [
            {
              id: "Email", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [email],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    async inviteUser() {
      if (
        this.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        const userExists = await this.getUserDB(this.email);
        if (userExists.length > 0) {
          alert("既に登録されているメールアドレスでは登録できません");
        } else {
          let params = JSON.stringify({
            email: this.email,
            g_id: "5f76ad7daa3d8a0001269956",
            // w_id: "ワークスペースのID",
            username: this.email
          });
          const userAddResult = await this.$hexalink.createUser(
            this.token,
            params
          );
          params = JSON.stringify({
            users: [
              {
                email: this.email
              }
            ],
            domain: "az-baton.hexabase.com", //az-baton.hexabase.com
            invitation_path: "signup"
          });
          this.sendResult = await this.$hexalink.inviteUser(this.token, params);
          this.errorMess = "";
        }
      } else {
        this.errorMess = "メールアドレスを入力してください";
      }
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
        const applicationId = applications[0].application_id;
        const datastores = applications[0].datastores;

        let datastoreIds = {};
        datastores.forEach(datastore => {
          datastoreIds[datastore.name] = datastore.datastore_id;
        });

        // ユーザ名の取得
        const userName = await this.$hexalink.getCurrentUserName(token);
        var params = {
          conditions: [
            {
              id: "userID",
              search_value: [userInfo.data.u_id],
              exact_match: true
            }
          ],
          page: 1,
          per_page: 1,
          use_display_id: true
        };
        var userMasters = await this.$hexalink.getItems(
          token,
          applicationId,
          datastoreIds["ユーザーマスタDB"],
          params
        );
        var userMaster = "";
        if (userMasters.length > 0) {
          userMaster = userMasters[0];
        }
        const userNameKanji =
          userMaster.ユーザー名 == undefined
            ? userInfo.data.username
            : userMaster.ユーザー名;
        const userID = userMaster.ユーザID;
        const userMail =
          userMaster.メールアドレス == undefined
            ? userInfo.data.email
            : userMaster.メールアドレス;
        const hexaID =
          userMaster.userID == undefined
            ? userInfo.data.u_id
            : userMaster.userID;
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
        this.$store.commit("datas/setDatastoreIds", datastoreIds);
        this.$store.commit("datas/setFields", fields);
        this.$router.push("/");
      } catch (e) {
        const { status, statusText } = e.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
        if (this.$refs.signin.validate()) {
          this.errorMess = "メールアドレスもしくはパスワードが違います。";
        }
      } finally {
        this.$store.commit("common/setLoading", false);
      }
    }
  }
};
</script>
