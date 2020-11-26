<template>
  <div id="page_mypage" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">マイページ</h2>
        </div>
      </div>
    </header>
    <section class="balance">
      <div class="content">
        <h3 class="balance_title">残高</h3>
        <div class="balance_box">
          <p class="balance_price">{{ deposits }}</p>
          <ul class="balance_link">
            <li>
              <button
                class="button-action"
                @mouseover="paymentMouseover"
                @mouseleave="paymentMouseleave"
              >
                {{ paymentMessage }}
              </button>
            </li>
            <li>
              <button
                class="button-action"
                @click="() => (withdrawalModal = true)"
              >
                −&nbsp;出金する
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="transaction">
      <div class="content">
        <h3 class="transaction_title">取引の詳細</h3>
        <div class="transaction_search">
          <dl class="transaction_search_list">
            <dt>照会期間</dt>
            <dd>
              <!-- <FormCalendar></FormCalendar> -->
              <v-text-field
                v-model="startDate"
                type="date"
                outlined
                single-line
                hint="照会開始日"
              ></v-text-field>
              〜
              <v-text-field
                v-model="endDate"
                type="date"
                outlined
                single-line
                value="2020-03-03"
                hint="照会終了日"
              ></v-text-field>
              <v-btn-toggle v-model="period" rounded borderless>
                <v-btn @click="clickToggle(0)">当日</v-btn>
                <v-btn @click="clickToggle(1)">１週間</v-btn>
                <v-btn @click="clickToggle(2)">１ヶ月</v-btn>
                <v-btn @click="clickToggle(3)">３ヶ月</v-btn>
                <v-btn @click="clickToggle(4)">６ヶ月</v-btn>
              </v-btn-toggle>
            </dd>
            <dt>照会内容</dt>
            <dd>
              <v-radio-group v-model="searchTarget" row>
                <v-radio label="全体" value="all"></v-radio>
                <v-radio label="入金内容のみ" value="入金"></v-radio>
                <v-radio label="出金内容のみ" value="出金"></v-radio>
                <v-radio label="分配金内容のみ" value="分配金"></v-radio>
              </v-radio-group>
              <!-- <v-select :items="searchTargetItems" outlined></v-select> -->
            </dd>
            <!-- <dt>検索順序</dt>
            <dd>
              <v-radio-group v-model="searchOrder" row>
                <v-radio label="最近の取引履歴が上" value="0"></v-radio>
                <v-radio label="過去の取引履歴を上" value="1"></v-radio>
              </v-radio-group>
            </dd> -->
          </dl>
          <button class="button-main" @click="inquireMyTransaction">
            照会する
          </button>
        </div>
        <div class="transaction_result">
          <template>
            <v-data-table
              :headers="transactionHeaders"
              :items="desserts"
              :items-per-page="5"
              class="transaction_list"
            ></v-data-table>
          </template>
        </div>
      </div>
    </section>

    <!-- modal -->
    <div class="modal_wrapper">
      <MyModal v-if="withdrawalModal" class="modal-bid" @close="closeModal">
        <template slot="title">出金確認</template>
        <div v-if="errorMess" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <v-form class="modalForm">
          <FormPassfield
            v-model="password"
            title="確認パスワード"
            placeholder="個人情報保護のためパスワード確認"
            :required="true"
          />
          <FormTextfield
            v-model="withdrawalValue"
            title="出金額"
            :number="true"
            :required="true"
            :keydown="checkKeyDown"
          />
          <div>※振込手数料が{{ fee * tax }}円かかります</div>
        </v-form>
        <div v-if="withdrawalSendResult" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            出金申請を行いました。
          </p>
        </div>
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="withdrawalChangeDisable"
            @click="doWithdrawal"
          >
            出金する
          </Button>
        </template>
      </MyModal>
    </div>
  </div>
</template>
<script>
import FormPassfield from "@/components/parts/form/FormPassfield.vue";
import FormTextfield from "@/components/parts/form/FormTextfield.vue";
import MyModal from "./MyModal.vue";
import moment from "moment-timezone";
export default {
  components: {
    FormPassfield,
    FormTextfield,
    MyModal
  },
  data() {
    return {
      page: 1,
      length: 0,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      email: this.$store.getters["user/getEmail"],
      period: null,
      searchTarget: "all",
      searchTargetItems: ["全体", "あああ"],
      searchOrder: "",
      transactionHeaders: [
        { text: "リクエスト日", value: "7c4e5d10-5fc4-4cff-81d4-de54d0fad1c8" },
        { text: "内訳", value: "4215764f-8b26-4ec1-b67f-ec90faf741a6" },
        { text: "曲名", value: "f3495cb9-aa68-43c0-98c7-4c0a8448c946" },
        { text: "歌手", value: "69b91c69-3231-4956-a34e-c6bd737fd206" },
        { text: "単価", value: "1023791c-f698-4314-af98-2a8a732c0474" },
        { text: "数量", value: "91854461-18ce-4652-88c5-6ae63d23c689" },
        { text: "税金", value: "4f9d5960-5f89-430b-9f03-d3549a97cf0a" },
        { text: "手数料", value: "d03ba2ed-0555-4cf7-b2ee-39e025989c59" },
        {
          text: "合計金額",
          value: "230edd8a-f368-449f-be30-53738150d166",
          align: "right"
        }
      ],
      desserts: [
        {
          date: "2020/05/20",
          breakdown: "入札",
          title: "パラボラ",
          artist: "Officialヒゲ男dism",
          amount: "10",
          price: "100,000"
        },
        {
          date: "2020/05/02",
          breakdown: "出金",
          title: "",
          artist: "",
          amount: "",
          price: "-410,000"
        },
        {
          date: "2020/04/18",
          breakdown: "入札",
          title: "プロローグ",
          artist: "Uru",
          amount: "1",
          price: "-100,000",
          incometax: "0"
        },
        {
          date: "2020/03/30",
          breakdown: "配当",
          title: "パプリカ",
          artist: "米津玄師",
          amount: "100",
          price: "10,000"
        },
        {
          date: "2020/02/08",
          breakdown: "売却",
          title: "パプリカ",
          artist: "米津玄師",
          amount: "50",
          price: "200,000"
        }
      ],
      dessertsTmp: [],
      paymentMessage: "＋ 入金する",
      errorMess: "",
      password: "",
      withdrawalModal: false,
      withdrawalValue: "",
      withdrawalSendResult: "",
      userItemId: "",
      deposits: 0,
      tax: 1.1,
      fee: 500,
      startDate: "",
      endDate: ""
    };
  },
  computed: {
    withdrawalChangeDisable() {
      return this.password && this.withdrawalValue ? false : true;
    }
  },
  created: async function() {},
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      // ユーザ残高を取得
      const params = {
        conditions: [
          {
            id: "会員番号",
            search_value: [this.userId],
            exact_match: true
          }
        ],
        page: 1,
        per_page: 1,
        use_display_id: true,
        sort_field_id: "created_at",
        sort_order: "desc"
      };
      const userInfo = await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["ユーザDB"],
        params
      );
      this.deposits = userInfo[0].残高 ? this.changeYen(userInfo[0].残高) : 0;
      this.depositsNumber = userInfo[0].残高 ? Number(userInfo[0].残高) : 0;
      this.userItemId = userInfo[0].i_id;

      // 取引履歴を取得
      const auctionLists = await this.$hexalink.getReports(
        this.token,
        this.applicationId,
        window.env.report.VUE_APP_TRADINGHISTORYREPORT_ID,
        {
          conditions: [
            {
              rpf_id: "0877fa61-b085-4df3-a184-9761d73db9ae",
              search_value: [this.userId],
              exact_match: true
            }
          ],
          sort_field_id: "7c4e5d10-5fc4-4cff-81d4-de54d0fad1c8",
          sort_order: "desc"
        }
      );
      this.dessertsTmp = auctionLists.report_results;
      for (const key in this.dessertsTmp) {
        if (!this.dessertsTmp[key]["1023791c-f698-4314-af98-2a8a732c0474"])
          this.dessertsTmp[key]["4f9d5960-5f89-430b-9f03-d3549a97cf0a"] = 0;
        if (!this.dessertsTmp[key]["d03ba2ed-0555-4cf7-b2ee-39e025989c59"])
          this.dessertsTmp[key]["d03ba2ed-0555-4cf7-b2ee-39e025989c59"] = 0;
        if (!this.dessertsTmp[key]["4f9d5960-5f89-430b-9f03-d3549a97cf0a"])
          this.dessertsTmp[key]["4f9d5960-5f89-430b-9f03-d3549a97cf0a"] = 0;
        switch (this.dessertsTmp[key]["4215764f-8b26-4ec1-b67f-ec90faf741a6"]) {
          case "出金申請中":
          case "出金完了":
            // 合計金額 = -単価 - 手数料
            this.dessertsTmp[key]["230edd8a-f368-449f-be30-53738150d166"] =
              0 -
              Number(
                this.dessertsTmp[key]["1023791c-f698-4314-af98-2a8a732c0474"]
              ) -
              Number(
                this.dessertsTmp[key]["d03ba2ed-0555-4cf7-b2ee-39e025989c59"]
              );
            break;
          case "分配金":
            if (!this.dessertsTmp[key]["91854461-18ce-4652-88c5-6ae63d23c689"])
              this.dessertsTmp[key]["91854461-18ce-4652-88c5-6ae63d23c689"] = 1;
            // 合計金額 = 単価 * 数量 - 税金 - 手数料
            this.dessertsTmp[key]["230edd8a-f368-449f-be30-53738150d166"] =
              Number(
                this.dessertsTmp[key]["1023791c-f698-4314-af98-2a8a732c0474"]
              ) *
                Number(
                  this.dessertsTmp[key]["91854461-18ce-4652-88c5-6ae63d23c689"]
                ) -
              Number(
                this.dessertsTmp[key]["4f9d5960-5f89-430b-9f03-d3549a97cf0a"]
              ) -
              Number(
                this.dessertsTmp[key]["d03ba2ed-0555-4cf7-b2ee-39e025989c59"]
              );
            break;
          case "入金":
            // 合計金額 = 単価 - 税金 - 手数料
            break;
        }
      }
      this.desserts = this.dessertsTmp;
    } catch (e) {
      console.log(e);
      this.$store.commit("auth/stateInit");
      this.$store.commit("datas/stateInit");
      this.$store.commit("user/stateInit");
      this.$router.push("/signin");
    } finally {
      // loading overlay非表示
      this.$store.commit("common/setLoading", false);
    }
  },
  methods: {
    paymentMouseover: function() {
      this.paymentMessage = "Comming soon";
    },
    paymentMouseleave: function() {
      this.paymentMessage = "＋ 入金する";
    },
    closeModal() {
      this.password = "";
      this.withdrawalValue = "";
      this.errorMess = "";
      this.withdrawalSendResult = "";
      this.withdrawalModal = false;
    },
    async doWithdrawal() {
      let token = "";
      try {
        token = await this.$hexalink.login(this.email, this.password);
      } catch {
        this.errorMess = "パスワードが一致しません。";
      }
      if (token) {
        if (
          !Number.isInteger(Number(this.withdrawalValue)) ||
          Number(this.withdrawalValue) === 0
        ) {
          console.log(this.withdrawalValue);
          this.errorMess = "出金額は0より大きい整数を入力してください";
          return;
        }
        const withdrawalValueDeposits =
          Number(this.depositsNumber) - Number(this.withdrawalValue);
        if (withdrawalValueDeposits - this.fee * this.tax < 0) {
          this.errorMess =
            "残高を超えての出金申請は行えません（手数料" +
            this.fee * this.tax +
            "円がかかります）";
          return;
        }
        try {
          // loading overlay表示
          this.$store.commit("common/setLoading", true);
          // 取引DBにレコード登録
          let setData = {};
          setData["タイプ"] = "1b9ccc50-7013-4045-8a56-45e0420bf1ba";
          setData["取引日"] = moment();
          setData["会員番号"] = this.userId;
          setData["著作権番号"] = "‐";
          setData["取引単価"] = Number(this.withdrawalValue);
          setData["取引総額"] = Number(this.withdrawalValue);
          setData["手数料"] = Number(this.fee * this.tax);

          let param = {};
          param["item"] = setData;
          const withdrawalInsertResult = await this.insertNewItem(
            this.datastoreIds["取引DB"],
            param
          );
          // ユーザDBの残高更新
          const depositsUpdateResult = await this.updatedDataItem(
            this.datastoreIds["ユーザDB"],
            this.userItemId,
            {
              history: {
                comment: "出金申請"
              },
              changes: [
                {
                  id: "残高",
                  value: withdrawalValueDeposits - this.fee * this.tax
                }
              ],
              use_display_id: true,
              is_force_update: true
            }
          );
          this.deposits = this.changeYen(
            withdrawalValueDeposits - this.fee * this.tax
          );
          this.errorMess = "";
          this.withdrawalSendResult =
            withdrawalInsertResult && depositsUpdateResult;
          this.withdrawalValue = "";
          this.password = "";
          // 取引履歴を取得
          const auctionLists = await this.$hexalink.getReports(
            this.token,
            this.applicationId,
            window.env.report.VUE_APP_TRADINGHISTORYREPORT_ID,
            {
              conditions: [
                {
                  rpf_id: "0877fa61-b085-4df3-a184-9761d73db9ae",
                  search_value: [this.userId],
                  exact_match: true
                }
              ],
              sort_field_id: "7c4e5d10-5fc4-4cff-81d4-de54d0fad1c8",
              sort_order: "desc"
            }
          );
          this.dessertsTmp = auctionLists.report_results;
          this.desserts = this.dessertsTmp;
        } catch (e) {
          this.errorMess = "出金申請時にエラーが発生しました。";
        } finally {
          // loading overlay非表示
          this.$store.commit("common/setLoading", false);
        }
      }
    },
    // 新規Itemを作成します
    async insertNewItem(datasotreId, param) {
      const token = this.$store.getters["auth/getToken"];
      const applicationId = this.$store.getters["datas/getApplicationId"];
      var result = {};
      try {
        result = await this.$hexalink.createNewItem(
          token,
          applicationId,
          datasotreId,
          param
        );
      } catch {
        result = {};
      }
      return result;
    },
    // データアイテムを更新します
    async updatedDataItem(datasotreId, itemId, payload) {
      const applicationId = this.$store.getters["datas/getApplicationId"];
      const token = this.$store.getters["auth/getToken"];
      return await this.$hexalink.editItem(
        token,
        applicationId,
        datasotreId,
        itemId,
        payload
      );
    },
    inquireMyTransaction() {
      const startDate = this.startDate;
      const endDate = this.endDate;
      const searchTarget = this.searchTarget;
      this.desserts = this.dessertsTmp.filter(function(value) {
        const diffFrom = startDate
          ? moment(value["7c4e5d10-5fc4-4cff-81d4-de54d0fad1c8"])
              .tz("Asia/Tokyo")
              .diff(moment(startDate)) >= 0
          : true;
        const diffTo = endDate
          ? moment(value["7c4e5d10-5fc4-4cff-81d4-de54d0fad1c8"])
              .tz("Asia/Tokyo")
              .diff(moment(endDate)) <= 0
          : true;
        const searchType =
          searchTarget !== "all"
            ? value["4215764f-8b26-4ec1-b67f-ec90faf741a6"].indexOf(
                searchTarget
              ) !== -1
            : true;
        return diffFrom && diffTo && searchType;
      });
    },
    changeYen(num) {
      if (!num) return 0;
      return String(num)
        .split("")
        .reverse()
        .join("")
        .match(/\d{1,3}/g)
        .join(",")
        .split("")
        .reverse()
        .join("");
    },
    clickToggle(period) {
      if (this.period === period) {
        this.startDate = "";
        this.endDate = "";
        this.period = null;
        return;
      }
      switch (period) {
        case 0:
          this.startDate = moment().format("yyyy-MM-DD");
          this.endDate = moment().format("yyyy-MM-DD");
          break;
        case 1:
          this.startDate = moment()
            .add("day", -7)
            .format("yyyy-MM-DD");
          this.endDate = moment().format("yyyy-MM-DD");
          break;
        case 2:
          this.startDate = moment()
            .add("day", -30)
            .format("yyyy-MM-DD");
          this.endDate = moment().format("yyyy-MM-DD");
          break;
        case 3:
          this.startDate = moment()
            .add("day", -90)
            .format("yyyy-MM-DD");
          this.endDate = moment().format("yyyy-MM-DD");
          break;
        case 4:
          this.startDate = moment()
            .add("day", -180)
            .format("yyyy-MM-DD");
          this.endDate = moment().format("yyyy-MM-DD");
          break;
      }
    },
    checkKeyDown(event) {
      if (
        event.keyCode == "190" ||
        event.keyCode == "69" ||
        event.keyCode == "109" ||
        event.keyCode == "110" ||
        event.keyCode == "189" ||
        event.keyCode == "38" ||
        event.keyCode == "40"
      ) {
        event.preventDefault();
      }
    }
  }
};
</script>

<style scoped></style>
