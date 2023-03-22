/**
 * hexalink API操作関連
 */
import axios from "axios";

const defaultConfig = {
  headers: {
    "content-type": "application/json"
  }
};

const apiDomain = window.env.VUE_APP_APIDOMAIN;

export default {
  install(Vue) {
    Vue.prototype.$hexalink = {
      /**
       * ログイン処理
       *
       * @param {*} email
       * @param {*} password
       * @returns  token
       */
      async login(email, password) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        const params = {
          email: email,
          password: password
        };
        const result = await axios.post(`${apiDomain}/login`, params, config);
        return result.data.token;
      },
      async logout(token) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        await axios.post(`${apiDomain}/users/logout`, {}, config);
      },
      /**
       * ログインユーザーIDを取得
       *
       * @param {*} token
       * @returns current username
       */
      async getCurrentUserName(token) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`${apiDomain}/userinfo`, config);
        return result.data.username;
      },
      /**
       * ログインユーザー名（漢字）を取得
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @param {*} username
       * @returns ユーザー名（漢字）
       */
      async getCurrentUserNameKanji(
        token,
        applicationId,
        datastoreId,
        username
      ) {
        let userNameKanji = "";
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/search`,
          {
            conditions: [
              {
                id: "ユーザーID",
                search_value: [username],
                exact_match: true
              }
            ],
            page: 1,
            per_page: 1,
            use_display_id: true
          },
          config
        );
        if (result.data.items.length > 0) {
          userNameKanji = result.data.items[0]["ユーザー名"];
        }
        return userNameKanji;
      },
      /**
       * ワークスペースの一覧を取得
       *
       * @param {*} token
       * @returns workspaces
       */
      async getWorkspaces(token) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`${apiDomain}/workspaces`, config);
        return result.data.workspaces;
      },
      /**
       * ワークスペースに紐づくアプリケーションの一覧を取得
       *
       * @param {*} token
       * @param {*} workspaceId
       * @returns
       */
      async getApplications(token, workspaceId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/workspaces/${workspaceId}/applications`,
          config
        );
        return result.data;
      },
      /**
       * データストアに紐づくフィールドの一覧を取得
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @returns
       */
      async getFields(token, applicationId, datastoreId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/fields`,
          config
        );
        return result.data.fields;
      },
      /**
       * データストアに紐づくアイテムの一覧を取得
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @param {*} params
       * @returns
       */
      async getItems(token, applicationId, datastoreId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/search`,
          params,
          config
        );
        return result.data.items;
      },
      /**
       * データストアに紐づくアイテムの一覧を取得
       *
       * @param {*} applicationId
       * @param {*} datastoreId
       * @param {*} params
       * @returns
       */
      async getPublicItems(applicationId, datastoreId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/search`,
          params,
          config
        );
        return result.data.items;
      },
      /**
       * 検索結果の件数を取得
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @param {*} params
       * @returns
       */
      async getItemCount(token, applicationId, datastoreId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/search`,
          params,
          config
        );
        return result.data.totalItems;
      },
      /**
       * アイテムの詳細を取得
       *
       * @param {*} token
       * @param {*} datastoreId
       * @param {*} itemId
       * @returns
       */
      async getItem(token, applicationId, datastoreId, itemId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/details/${itemId}`,
          config
        );
        return result.data.field_values;
      },
      /**
       * @param {*} token
       * @param {*} datastoreId
       * @param {*} itemId
       * @returns
       */
      async getActionList(token, datastoreId, itemId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/datastores/${datastoreId}/items/${itemId}`,
          config
        );
        console.log("getActionList", result);
        return result.data.item_actions;
      },
      /**
       * 申請IDの自動採番
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @returns
       */
      async getApprovalId(token, applicationId, datastoreId) {
        let approveId = 1;
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/search`,
          {
            conditions: [],
            page: 1,
            per_page: 1,
            sort_field_id: "申請ID",
            sort_order: "desc",
            use_display_id: true
          },
          config
        );
        if (result.data.items.length > 0) {
          approveId = parseInt(result.data.items[0]["申請ID"]) + 1;
        }
        return approveId;
      },
      /**
       * @param {*} token
       * @param {*} datastoreId
       * @param {*} itemId
       * @returns
       */
      async execAction(token, itemId, actionId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/items/${itemId}/actions/${actionId}`,
          params,
          config
        );
        console.log("execAction", result);
        return result.data;
      },
      /**
       * ファイルを取得
       *
       * @param {*} token
       * @param {*} fileId
       * @returns
       */
      async getFile(token, fileId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["content-type"] = "text/plain";
        config["responseType"] = "arraybuffer";
        const result = await axios.get(`${apiDomain}/files/${fileId}`, config);
        return result.data;
      },
      /**
       * Public API経由でファイルを取得
       *
       * @param {*} fileId
       * @param {*} workspaceId
       * @returns
       */
      async getPublicFile(fileId, workspaceId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["content-type"] = "text/plain";
        config["responseType"] = "arraybuffer";
        const result = await axios.get(
          `${apiDomain}/files/${fileId}/${workspaceId}`,
          config
        );
        return result.data;
      },
      /**
       * 新規アイテムを作成
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @returns
       */
      async createNewItem(token, applicationId, datastoreId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/new`,
          params,
          config
        );
        console.log(result);
        return result;
      },
      async newItem(token, applicationId, datastoreId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/new`,
          params,
          config
        );
        console.log("newItem", result);
        return result;
      },
      /**
       * アイテムを更新
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} datastoreId
       * @param {*} itemId
       * @param {*} params
       * @returns
       */
      async editItem(token, applicationId, datastoreId, itemId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        console.log("token", token);
        console.log("applicationId", applicationId);
        console.log("datastoreId", datastoreId);
        console.log("itemId", itemId);
        console.log("params", params);
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/edit/${itemId}`,
          params,
          config
        );
        return result;
      },
      async uploadFile(token, itemId, fieldId, formData) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/items/${itemId}/fields/${fieldId}/attachments`,
          formData,
          config
        );
        console.log("uploadFile", result);
        return result;
      },
      async deleteFile(token, itemId, fieldId, fileId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.delete(
          `${apiDomain}/items/${itemId}/fields/${fieldId}/attachments/${fileId}`,
          config
        );
        console.log("deleteFile", result);
        return result;
      },
      /**
       * UserInfoの取得
       *
       * @param {*} token
       * @returns
       */
      async getUserInfo(token) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`${apiDomain}/userinfo`, config);
        return result;
      },
      /**
       * @param {*} token
       * @param {*} datastoreId
       * @param {*} itemId
       * @returns
       */
      async deleteItem(token, applicationId, datastoreId, itemId) {
        var headers = {};
        headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.delete(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/delete/${itemId} `,
          { headers, data: {} }
        );
        return result;
      },
      /**
       * グループツリーを取得
       *
       * @param {*} token
       * @returns GroupTree
       */
      async getGroupTree(token) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`${apiDomain}/grouptree`, config);
        return result.data.result;
      },
      /**
       * ユーザを招待（Hexalink）
       *
       * @param {*} token
       * @param {*} params
       * @returns GroupTree
       */
      async inviteUser(token, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/userinvite`,
          params,
          config
        );
        return result;
      },
      /**
       * ユーザを招待（Hexalink）
       *
       * @param {*} token
       * @param {*} params
       * @returns GroupTree
       */
      async confirmRegistration(token, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/userinvite`,
          params,
          config
        );
        return result;
      },
      /**
       * ユーザを登録（Hexalink）
       *
       * @param {*} token
       * @param {*} params
       * @returns GroupTree
       */
      async createUser(token, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(`${apiDomain}/users`, params, config);
        return result;
      },
      /**
       * 登録mail送信（Hexalink）
       *
       * @param {*} token
       * @param {*} params
       * @returns GroupTree
       */
      async putUsersRegis(token, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/users/registration`,
          params,
          config
        );
        return result;
      },
      /**
       * @param {*} token
       * @param {*} params
       * @returns
       */
      async deleteUsers(token, params) {
        var headers = {};
        headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.delete(`${apiDomain}/users`, {
          headers,
          data: params
        });
        return result;
      },
      /*
       * 関連レコードの取得
       * @param {*} token
       * @param {*} datastoreId
       * @param {*} itemId
       * @param {*} linkedDatastoreId
       */
      async getRelationItems(token, datastoreId, itemId, linkedDatastoreId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/datastores/${datastoreId}/items/${itemId}/links/${linkedDatastoreId}`,
          config
        );
        return result.data.items;
      },
      /*
       * 登録対象のユーザ情報取得
       * @param {*} confirmatioId
       */
      async getConfirmUserData(confirmatioId) {
        const result = await axios.get(
          `${apiDomain}/users/registration/confirm?id=${confirmatioId}`
        );
        return result;
      },
      /*
       * パスワード登録
       * @param {*} param
       */
      async confirmUser(param) {
        const result = await axios.post(
          `${apiDomain}/users/registration/confirm`,
          param
        );
        return result;
      },
      /*
       * パスワードリセット用confirmation_idを取得
       */
      async getConfirmations() {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        const result = await axios.post(`${apiDomain}/confirmations`, config);
        return result.data.confirmation_id;
      },
      /*
       * パスワード初期化リクエスト
       * @param {*} param
       */
      async resetPassword(param) {
        const result = await axios.post(
          `${apiDomain}/users/password/forgot`,
          param
        );
        return result;
      },
      /*
       * パスワード再登録
       * @param {*} param
       */
      async setNewPassword(param) {
        const result = await axios.put(
          `${apiDomain}/users/password/forgot`,
          param
        );
        return result;
      },
      /*
       * ログイン後、パスワード更新
       * @param {*} param
       */
      async setPassword(token, param) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.put(
          `${apiDomain}/users/password`,
          param,
          config
        );
        return result;
      },
      /*
       * メールアドレス更新申請
       * @param {*} param
       */
      async setMailAddress(token, param) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/users/email`,
          param,
          config
        );
        return result;
      },
      /*
       * メールアドレス変更情報確認
       * @param {*} token
       * @param {*} confirmationId
       */
      async confirmUserEmail(token, confirmationId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/users/confirmations/${confirmationId}`,
          config
        );
        return result;
      },
      /*
       * メールアドレス更新
       * @param {*} param
       */
      async updateUserEmail(token, param) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/users/confirmations`,
          param,
          config
        );
        return result;
      },
      /*
       * ユーザinformation取得
       * @param {*} token
       * @param {*} groupId
       * @param {*} recursive
       */
      async getGroupUsers(token, groupId, recursive) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/groups/${groupId}/users?recursive=${recursive}`,
          config
        );
        return result;
      },
      /**
       * データレポートに紐づく一覧を取得
       *
       * @param {*} token
       * @param {*} applicationId
       * @param {*} reportId
       * @param {*} params
       * @returns
       */
      async getReports(token, applicationId, reportId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/reports/${reportId}/filter`,
          params,
          config
        );
        return result.data;
      },
      /**
       * データレポートに紐づく一覧をPublic APIで取得
       *
       * @param {*} applicationId
       * @param {*} reportId
       * @param {*} params
       * @returns
       */
      async getPublicReports(applicationId, reportId, params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        const result = await axios.post(
          `${apiDomain}/applications/${applicationId}/reports/${reportId}/filter`,
          params,
          config
        );
        return result.data;
      },
      async getItemSearchConditions(token, applicationId, datastoreId) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(
          `${apiDomain}/applications/${applicationId}/datastores/${datastoreId}/items/conditions`,
          config
        );
        return result.data.result;
      },
      async unauthorizedCall(params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        const result = await axios.post(
          `${apiDomain}/auth/unauthorized-call`,
          params,
          config
        );
        return result.data;
      },
      async unauthorizedCallFile(params) {
        let config = JSON.parse(JSON.stringify(defaultConfig));
        config.headers["content-type"] = "text/plain";
        config["responseType"] = "arraybuffer";
        const result = await axios.post(
          `${apiDomain}/auth/unauthorized-call`,
          params,
          config
        );
        return result.data;
      }
    };
  }
};
