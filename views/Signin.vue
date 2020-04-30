<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>ログイン</v-toolbar-title>
              </v-toolbar>
              <template v-if="errorMess != ''">
                <section
                  style="padding-top: 10px;padding-left: 10px;color: red;"
                >
                  {{ errorMess }}
                </section>
              </template>
              <v-card-text>
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
                        type="password"
                        placeholder="パスワード"
                        :error-messages="errors"
                        required
                      />
                    </validation-provider>
                  </ValidationObserver>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="signin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
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
      errorMess: ""
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
          userMaster.userID == undefined ? userInfo.u_id : userMaster.userID;
        const isApproval = userMaster.承認管理 == 1 ? true : false;
        const isAppHist = userMaster.承認履歴 == 1 ? true : false;
        const isUser = userMaster.ユーザ管理 == 1 ? true : false;
        const isCsv = userMaster.CSV一括 == 1 ? true : false;
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
        // this.$store.commit("user/setHexaID", hexaID);
        // this.$store.commit("user/setIsAdmin", userInfo.data.is_ws_admin);
        // this.$store.commit("user/setIsApproval", isApproval);
        // this.$store.commit("user/setIsAppHist", isAppHist);
        // this.$store.commit("user/setIsUser", isUser);
        this.$store.commit("datas/setDatastoreIds", datastoreIds);
        this.$store.commit("datas/setFields", fields);
        this.$router.push("/auctionbid");
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
