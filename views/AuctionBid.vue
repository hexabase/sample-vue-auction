<template>
  <div
    v-if="applicabilityOnHomepage == '掲載する'"
    id="page_auction"
    data-role="page"
  >
    <div class="musicInfo_img-mobile"><img :src="image1" /></div>
    <section class="musicInfo">
      <div class="content">
        <figure class="musicInfo_img">
          <img :src="image1" />
        </figure>
        <div class="musicInfo_wrap">
          <h2 class="musicInfo_title">{{ title }}</h2>
          <div class="musicInfo_data">
            <dl class="musicInfo_remain">
              <dt>残り時間</dt>
              <dd>
                <div v-if="auctionFinishedFlag">Closed</div>
                <div v-if="!auctionFinishedFlag">
                  {{ remainingTime.days }}<span class="unit">日</span>
                  {{ remainingTime.hours }}<span class="unit">時間</span>
                  {{ remainingTime.minutes }}<span class="unit">分</span>
                  {{ remainingTime.seconds }}<span class="unit">秒</span>
                </div>
              </dd>
            </dl>
            <dl class="musicInfo_amount">
              <dt>オークション数量</dt>
              <dd>
                {{ auctionAmount }}
                <span class="unit">口</span>
              </dd>
            </dl>
            <dl class="musicInfo_startPrice">
              <dt>オークション開始価格<span>（1口、消費税を含む）</span></dt>
              <dd>
                {{ changeYen(Number(auctionStartPrice)) }}
                <span class="unit">円</span>
              </dd>
            </dl>
          </div>
          <table v-if="false" class="musicInfo_data">
            <tr>
              <th>残り時間</th>
              <th>オークション数量</th>
              <th>オークション開始価格<span>（1口、消費税を含む）</span></th>
            </tr>
            <tr>
              <td>
                <div v-if="auctionFinishedFlag">Closed</div>
                <div v-if="!auctionFinishedFlag" v-html="remainingTime"></div>
              </td>
              <td>
                {{ auctionAmount }}
                <span class="unit">口</span>
              </td>
              <td>
                {{ changeYen(Number(auctionStartPrice)) }}
                <span class="unit">円</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <section class="auctionInfo">
      <div class="content">
        <h2 class="auctionInfo_title">
          オークションの{{ auctionFinishedFlag ? "結果" : "状況" }}
        </h2>
        <div class="auctionInfo_wrap">
          <div class="auctionInfo_left">
            <table class="bidList">
              <thead>
                <tr>
                  <th>入札価格（1口）</th>
                  <th>入札数量</th>
                  <th>オークション結果</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, index) in auctionListsGroup"
                  :key="index"
                  class="option"
                >
                  <td>
                    {{
                      changeYen(value["d2813a9b-33e5-405f-9116-ff9c97a0bf06"])
                    }}
                    円
                  </td>
                  <td>
                    {{ value["4384d821-8e19-4e08-949b-44cab6efa408"] }}
                  </td>
                  <td>{{ value.落札状況 }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>合計</td>
                  <td class="bidList_total">{{ bidTotalAmount }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div v-if="!auctionFinishedFlag" class="auctionInfo_right">
            <section class="bidBox">
              <!-- ▼入札済みの表示：ここから▼ -->
              <div v-if="displayBidResultFlag" class="currentBid">
                <h3 class="currentBid_title">現在以下の内容で入札しています</h3>
                <div class="currentBid_body">
                  <p class="currentBid_detail">
                    {{ changeYen(myAuctionBidList[0].入札金額) }}
                    <span class="unit">円&nbsp;×&nbsp;</span>
                    {{ myAuctionBidList[0].数量 }}
                    <span class="unit">口</span>
                  </p>
                  <p class="currentBid_total">
                    （総入札価格：{{
                      changeYen(
                        myAuctionBidList[0].入札金額 * myAuctionBidList[0].数量
                      )
                    }}円）
                  </p>
                  <p class="currentBid_status">
                    オークション結果：{{ myAuctionResult }}
                  </p>
                  <!-- <button class="button-sub" @click="openModal('cancelModal')"> -->
                  <button
                    class="button-sub"
                    :disabled="Number(myAuctionBidList[0].キャンセル回数) > 2"
                    @click="openModal('cancelModal')"
                  >
                    キャンセル
                    <span class="currentBid_remain">
                      （残り可能回数：{{
                        3 - Number(myAuctionBidList[0].キャンセル回数)
                      }}回）
                    </span>
                  </button>
                </div>
              </div>
              <!-- ▲入札済みの表示：ここまで▲ -->
              <!-- TODO：以下、入札済みの場合「入札→再入札」 -->
              <h3 class="bidBox_title">入札</h3>
              <div class="bidBox_field">
                <label>入札価格<span>（1口、消費税を含む）</span></label>
                <input
                  id="amount"
                  v-model="bidPrice"
                  type="number"
                  name="amount"
                  class="form-box"
                  step="500"
                  max="999999999"
                  onpaste="return false"
                  @keydown="multipleHandler"
                />
                <span class="bidBox_unit">円</span>
                <p class="note">※500円の倍数から入札可能です。</p>
              </div>
              <div class="bidBox_field">
                <label>入札数量</label>
                <input
                  id="cnt_units"
                  v-model="bidAmount"
                  type="number"
                  name="cnt_units"
                  class="form-box"
                  max="99999"
                  onpaste="return false"
                  @keydown="multipleHandler"
                />
              </div>
              <p class="bidBox_total">
                総入札価格（税込）：
                <span class="price">{{ changeYen(bidPrice * bidAmount) }}</span>
                円
              </p>
              <div v-if="userStatus === 1">
                <button class="button-action" @click="applyUserInfo">
                  <span v-if="userInfo.length > 0">
                    ユーザー情報を登録して
                  </span>
                  入札する
                </button>
              </div>
              <div v-if="userStatus === 2" class="bidBox_userInfo">
                現在ユーザー情報登録を申請中です。<br />承認されると入札可能になります。承認までもうしばらくお待ち下さい。
              </div>
              <button
                v-if="userStatus === 3"
                class="button-action"
                @click="openModal('modal')"
              >
                入札する
              </button>
              <div v-if="userStatus === 4" class="bidBox_userInfo">
                お客様のアカウントは現在サービスをご利用できません。管理者までお問い合わせください。
              </div>
              <v-alert v-if="alertMessage != ''" text color="red">
                {{ alertMessage }}
              </v-alert>
            </section>
            <dl class="bidPolicy">
              <dt>入札規定</dt>
              <dd>
                入札価格は、500円の倍数で有効な数値を入力してください。
              </dd>
              <dd>
                オークション開始価格より低い入札価格では入札できません。
              </dd>
              <dd>
                オークション開始価格の10倍より多い入札価格では入札できません。
              </dd>
              <dd>
                オークション数量の25%より多い数量では入札できません
              </dd>
              <dd>
                部分落札圏内について、入札先着順で落札者を決めます。
              </dd>
              <dd>
                前回の入札価格より少ない入札価格では入札できません。※キャンセル（回数制限有）から入札は可能です
              </dd>
              <dd>
                キャンセル可能回数は3回までです。
              </dd>
              <dd>
                落札成功後に不払込が発生する場合、以降入札が参加できなくなりますので、ご注意ください
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <div class="modal_wrapper">
      <!-- コンポーネント MyModal -->
      <MyModal v-if="modal" class="modal-bid" @close="closeModal('modal')">
        <template slot="title">入札する</template>
        <!-- default スロットコンテンツ -->
        <table class="modal-bid_table">
          <tr>
            <th>入札価格：</th>
            <td>
              <span class="amount">{{ changeYen(bidPrice) }}</span> 円
            </td>
          </tr>
          <tr>
            <th>入札数量：</th>
            <td>
              <span class="amount">{{ bidAmount }}</span>
            </td>
          </tr>
          <tr class="modal-bid_table_total">
            <th>総入札価格：</th>
            <td>
              <span class="amount">{{ changeYen(bidPrice * bidAmount) }}</span>
              円
            </td>
          </tr>
        </table>

        <div class="bidGuideline_wrap">
          <section class="bidGuideline">
            <h3 class="bidGuideline_title">利用規約</h3>
            <div class="bidGuideline_body">
              <Terms />
            </div>
          </section>
          <v-checkbox
            v-model="agreeGuideline"
            label="利用規約に同意する"
          ></v-checkbox>
        </div>
        <!-- /default -->
        <!-- footer スロットコンテンツ -->
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="!agreeGuideline"
            @click="doSend"
          >
            <!--span class="subText">利用規約に同意して</span-->
            入札する
          </Button>
        </template>
        <!-- /footer -->
      </MyModal>
      <MyModal
        v-if="cancelModal"
        class="modal-bid"
        @close="closeModal('cancelModal')"
      >
        <template slot="title">入札キャンセル</template>
        <p class="modal-bid_text">{{ userName }} 様 現在の入札状況</p>
        <ul class="modal-bid_list">
          <li>入札価格：{{ myAuctionBidList[0].入札金額 }}円</li>
          <li>入札数量：{{ myAuctionBidList[0].数量 }}口</li>
          <li>
            総入札価格：
            {{
              changeYen(
                myAuctionBidList[0].入札金額 * myAuctionBidList[0].数量
              )
            }}円
          </li>
        </ul>
        <p class="modal-bid_confirm">
          こちらキャンセルしてよろしいでしょうか？
        </p>
        <p class="modal-bid_announce">
          ※一つの著作権でのキャンセルは3回までしかできません。残り
          <strong>
            {{ 3 - Number(myAuctionBidList[0].キャンセル回数) }}
            回
          </strong>
          キャンセルできます。
        </p>
        <template slot="footer">
          <Button class="button-sub" @click="doCancel()">
            入札をキャンセルする
          </Button>
        </template>
      </MyModal>
    </div>
  </div>
</template>
<script>
import MyModal from "./MyModal.vue";
import Terms from "./Terms.vue";
import moment from "moment-timezone";
import _ from "lodash";
export default {
  components: { MyModal, Terms },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  },
  // components: { MyModal, Chart },
  data() {
    return {
      loaded: false,
      modal: false,
      cancelModal: false,
      page: 1,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      userName: this.$store.getters["auth/getUserNameKanji"],
      copyrightNumber: "",
      image1: "",
      image2: "",
      image3: "",
      copyrightType: "",
      title: "",
      titleEn: "",
      titleKr: "",
      explanatoryText: "",
      explanatoryTextEn: "",
      explanatoryTextKr: "",
      publicationDate: "",
      originalAuthorDeathDate: "",
      protectionPeriod: "",
      aaHoldingInterest: "",
      bbHoldingInterest: "",
      ccHoldingInterest: "",
      ddHoldingInterest: "",
      eeHoldingInterest: "",
      possessionNotes: "",
      otherNotes: "",
      Tag: "",
      applicability: "",
      applicabilityOnHomepage: "",
      rightsStartDate: "",
      rightPeriod: "",
      Seller: "",
      managementPublisher: "",
      totalAmount: "",
      auctionStatus: "",
      auctionStartDate: "",
      auctionEndDate: "",
      auctionAmount: "",
      auctionStartPrice: "",
      auctionEndPrice: "",
      auctionListsGroup: [],
      bidTotalAmount: 0,
      bidPrice: 0,
      bidAmount: 1,
      counterInterval: null,
      remainingTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      agreeGuideline: false,
      itemId: "",
      myAuctionBidList: [],
      myAuctionResult: "",
      alertMessage: "",
      displayBidResultFlag: false,
      auctionFinishedFlag: false,
      distributionListGroupYear: {
        data: [],
        labels: []
      },
      distributionListGroupQuarter: {
        data: [],
        labels: []
      },
      userInfo: [],
      userStatus: 1,
      docDefinition: {
        content: [
          {
            text: "保管用交付書面",
            style: "header"
          }
        ],
        defaultStyle: {
          font: "GenShin"
        },
        styles: {
          header: {
            fontSize: 30
          },
          subheader: {
            fontSize: 20
          }
        }
      },
      pdfFile1: "",
      pdfFileBuffer1: null,
      pdfFile2: "",
      pdfFileBuffer2: null,
      pdfFile3: "",
      pdfFileBuffer3: null,
      fileName1: "",
      fileName2: "",
      fileName3: "",
      confirmDeliveryDocumentFlag1: false,
      confirmDeliveryDocumentFlag2: false,
      confirmDeliveryDocumentFlag3: false
    };
  },
  created: function() {},
  mounted: async function() {
    await this.initialDisplay();
    this.counterInterval = setInterval(this.updateMessage, 1000);
  },
  methods: {
    isProcessing() {
      return this.agreeGuideline;
    },
    async openModal(modalType) {
      if (modalType == "modal") {
        if (
          this.bidPrice == 0 ||
          this.bidPrice == "" ||
          this.bidAmount == 0 ||
          this.bidAmount == "" ||
          this.bidPrice % 500 > 0
        ) {
          this.alertMessage = "500円の倍数で有効な数値を入力してください。";
          return false;
        }
        if (Number(this.bidPrice) < Number(this.auctionStartPrice)) {
          this.alertMessage =
            "オークション開始価格より低い入札価格では入札できません。";
          return false;
        }
        if (Number(this.bidPrice) > Number(this.auctionStartPrice) * 10) {
          this.alertMessage =
            "オークション開始価格の10倍より多い入札価格では入札できません。";
          return false;
        }
        if (Number(this.bidAmount) > (Number(this.auctionAmount) * 25) / 100) {
          this.alertMessage =
            "オークション数量の25%より多い数量では入札できません（" +
            Math.floor((Number(this.auctionAmount) * 25) / 100) +
            "まで入札可）";
          return false;
        }
        if (this.userId) {
          try {
            this.myAuctionBidList = await this.getAuctionBidList();
            this.myTransactionList = await this.getTransactionList();
            if (this.displayBidResultFlag) {
              if (
                Number(this.bidPrice) <
                Number(this.myAuctionBidList[0].入札金額)
              ) {
                this.alertMessage =
                  "前回の入札価格より少ない入札価格では入札できません。※キャンセル（回数制限有）から入札は可能です";
                return false;
              } else if (
                Number(this.bidPrice) ==
                  Number(this.myAuctionBidList[0].入札金額) &&
                Number(this.bidAmount) < Number(this.myAuctionBidList[0].数量)
              ) {
                this.alertMessage =
                  "前回の数量より少ない数量では入札できません。※キャンセル（回数制限有）から入札は可能です";
                return false;
              } else if (
                Number(this.bidPrice) ==
                  Number(this.myAuctionBidList[0].入札金額) &&
                Number(this.bidAmount) == Number(this.myAuctionBidList[0].数量)
              ) {
                this.alertMessage =
                  "前回と同じ入札価格・数量では入札できません。";
                return false;
              }
            }
            this.alertMessage = "";
            this.modal = true;
          } catch (e) {
            this.$store.commit("auth/stateInit");
            this.$store.commit("datas/stateInit");
            this.$store.commit("user/stateInit");
            this.$router.push("/signin");
          }
        } else {
          // ログインしていないユーザ
          alert("入札は会員登録後、ログインしてから行えます。");
        }
      } else {
        this.cancelModal = true;
      }
    },
    closeModal(modalType) {
      if (modalType == "modal") {
        this.modal = false;
      } else {
        this.cancelModal = false;
      }
    },
    async getAuctionBidList() {
      return await this.$hexalink.getItems(
        this.token,
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_AUCTIONBIDTABLE_ID,
        {
          conditions: [
            {
              id: "商品番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.itemId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    async getTransactionList() {
      return await this.$hexalink.getItems(
        this.token,
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_TRANSACTIONTABLE_ID,
        {
          conditions: [
            {
              id: "商品番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.itemId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
    },
    async doSend() {
      try {
        if (this.auctionFinishedFlag) {
          alert("既にオークションが終了しているため入札できません");
          this.initialDisplay();
          this.modal = false;
          return;
        }
        if (this.userStatus !== 3) {
          alert("承認されていないユーザは入札できません");
        }
        // 入札履歴があった場合は更新処理
        if (this.myAuctionBidList.length > 0) {
          var result = await this.updatedDataItem(
            window.env.table.VUE_APP_AUCTIONBIDTABLE_ID,
            this.myAuctionBidList[0].i_id,
            {
              history: {
                comment: "再入札"
              },
              changes: [
                {
                  id: "数量",
                  value: Number(this.bidAmount)
                },
                {
                  id: "入札金額",
                  value: Number(this.bidPrice)
                },
                {
                  id: "入札時間",
                  value: moment()
                },
                {
                  id: "連続入札回数",
                  value: Number(this.myAuctionBidList[0].連続入札回数) + 1
                },
                {
                  id: "落札状況",
                  value: "入札"
                }
              ],
              use_display_id: true,
              is_force_update: true
            }
          );
          this.modal = false;
        }
        // 初回入札は登録処理
        else {
          var setData = {};
          setData["商品番号"] = this.itemId;
          setData["会員番号"] = this.userId;
          setData["数量"] = Number(this.bidAmount);
          setData["入札金額"] = Number(this.bidPrice);
          setData["入札時間"] = moment();
          setData["連続入札回数"] = 0;
          setData["キャンセル回数"] = 0;
          setData["落札状況"] = "入札";

          var param = {};
          param["item"] = setData;
          var insertResult = await this.insertNewItem(
            window.env.table.VUE_APP_AUCTIONBIDTABLE_ID,
            param
          );
          this.modal = false;
        }
        // await this.initialDisplay();
        this.myAuctionBidList[0] = {
          入札金額: this.bidPrice,
          数量: this.bidAmount,
          キャンセル回数: 0
        };
        this.displayBidResultFlag = true;
      } catch (e) {
        console.log(e);
        this.$store.commit("auth/stateInit");
        this.$store.commit("datas/stateInit");
        this.$store.commit("user/stateInit");
        this.$router.push("/signin");
      }
    },
    async doCancel() {
      try {
        if (Number(this.myAuctionBidList[0].キャンセル回数) > 2) {
          return false;
        }
        var result = await this.updatedDataItem(
          window.env.table.VUE_APP_AUCTIONBIDTABLE_ID,
          this.myAuctionBidList[0].i_id,
          {
            history: {
              comment: "キャンセル"
            },
            changes: [
              {
                id: "入札時間",
                value: moment()
              },
              {
                id: "連続入札回数",
                value: 0
              },
              {
                id: "キャンセル回数",
                value: Number(this.myAuctionBidList[0].キャンセル回数) + 1
              },
              {
                id: "落札状況",
                value: "キャンセル済"
              }
            ],
            use_display_id: true,
            is_force_update: true
          }
        );
        // await this.initialDisplay();
        this.cancelModal = false;
        this.displayBidResultFlag = false;
      } catch (e) {
        this.$store.commit("auth/stateInit");
        this.$store.commit("datas/stateInit");
        this.$store.commit("user/stateInit");
        this.$router.push("/signin");
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
    async deleteItem(datasotreId, itemId) {
      // 削除処理作成
      const token = this.$store.getters["auth/getToken"];
      const applicationId = this.$store.getters["datas/getApplicationId"];

      return await this.$hexalink.deleteItem(
        token,
        applicationId,
        datasotreId,
        itemId
      );
    },
    updateMessage() {
      // diffメソッドを使って、日時の差を、ミリ秒で取得
      const diff = moment(
        moment(this.auctionEndDate)
          .tz("Asia/Tokyo")
          .format()
          .slice(0, -14) + this.auctionEndTime
      ).diff(moment());
      if (diff < 0 || this.applicabilityOnHomepage !== "掲載する") {
        this.auctionFinishedFlag = true;
        return false;
      } else {
        this.auctionFinishedFlag = false;
      }
      // ミリ秒からdurationオブジェクトを生成
      const duration = moment.duration(diff);

      // 日・時・分・秒を取得
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      //カウントダウンの結果を変数に代入
      this.remainingTime.days = days;
      this.remainingTime.hours = ("00" + hours).slice(-2);
      this.remainingTime.minutes = ("00" + minutes).slice(-2);
      this.remainingTime.seconds = ("00" + seconds).slice(-2);
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
    checkDigits(event) {
      if (
        event.target.value.length > event.target.max.length - 1 &&
        event.keyCode !== 8 &&
        event.keyCode !== 46 &&
        event.keyCode !== 37 &&
        event.keyCode !== 39 &&
        event.keyCode !== 9
      ) {
        switch (event.target.id) {
          case "amount":
            event.preventDefault();
            break;
          case "cnt_units":
            event.preventDefault();
            break;
        }
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
    },
    multipleHandler(event) {
      this.checkDigits(event);
      this.checkKeyDown(event);
    },
    groupByYear(array) {
      const groups = {};
      array.forEach(function(item) {
        const key = item["日付"].slice(0, 4);
        if (!(key in groups)) groups[key] = [];
        groups[key].push(item);
      });
      return groups;
    },
    groupByQuarter(array) {
      if (!array.length > 0) return;
      const groups = {};
      array.sort(function(a, b) {
        return a.日付 < b.日付 ? 1 : -1;
      });
      console.log(array[0].日付);
      const latestRecordSeason = moment(array[0]["日付"])
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .slice(5, 7);
      const latestRecordYear = moment(array[0]["日付"])
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .slice(0, 4);
      switch (latestRecordSeason) {
        case "01":
        case "02":
        case "03":
          groups[String(Number(latestRecordYear) - 1) + "年第1四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第2四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第3四半期"] = [];
          groups[latestRecordYear + "年第4四半期"] = [];
          break;
        case "04":
        case "05":
        case "06":
          groups[String(Number(latestRecordYear) - 1) + "年第3四半期"] = [];
          groups[String(Number(latestRecordYear) - 1) + "年第4四半期"] = [];
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          break;
        case "07":
        case "08":
        case "09":
          groups[String(Number(latestRecordYear) - 1) + "年第4四半期"] = [];
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          groups[latestRecordYear + "年第3四半期"] = [];
          break;
        case "10":
        case "11":
        case "12":
          groups[latestRecordYear + "年第1四半期"] = [];
          groups[latestRecordYear + "年第2四半期"] = [];
          groups[latestRecordYear + "年第3四半期"] = [];
          groups[latestRecordYear + "年第4四半期"] = [];
          break;
      }

      for (const key in array) {
        const jstMonth = moment(array[key]["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM")
          .slice(5, 7);
        const jstYear = moment(array[key]["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM")
          .slice(0, 4);
        switch (jstMonth) {
          case "01":
          case "02":
          case "03":
            groups[jstYear + "年第1四半期"].push(array[key]);
            break;
          case "04":
          case "05":
          case "06":
            groups[jstYear + "年第2四半期"].push(array[key]);
            break;
          case "07":
          case "08":
          case "09":
            groups[jstYear + "年第3四半期"].push(array[key]);
            break;
          case "10":
          case "11":
          case "12":
            groups[jstYear + "年第4四半期"].push(array[key]);
            break;
        }
      }
      Object.keys(groups).sort();
      return groups;
    },
    async initialDisplay() {
      try {
        // loading overlay表示
        this.$store.commit("common/setLoading", true);
        this.itemId = this.$route.params.id;
        this.myAuctionBidList = await this.getAuctionBidList();
        if (
          this.myAuctionBidList.length > 0 &&
          this.myAuctionBidList[0].落札状況 != "キャンセル済"
        ) {
          this.displayBidResultFlag = true;
          this.confirmDeliveryDocumentFlag1 = true;
          this.confirmDeliveryDocumentFlag2 = true;
          this.confirmDeliveryDocumentFlag3 = true;
        } else {
          this.displayBidResultFlag = false;
          this.confirmDeliveryDocumentFlag1 = false;
          this.confirmDeliveryDocumentFlag2 = false;
          this.confirmDeliveryDocumentFlag3 = false;
        }
        var dataLists = [];
        dataLists = await this.$hexalink.getItems(
          this.token,
          window.env.VUE_APP_APPLICATION_ID,
          window.env.table.VUE_APP_COPYRIGHTTABLE_ID,
          {
            conditions: [
              {
                id: "商品番号", // Hexalink画⾯で⼊⼒したIDを指定
                search_value: [this.itemId],
                exact_match: true // 完全⼀致で検索
              }
            ],
            page: 1,
            per_page: 9000,
            use_display_id: true
          }
        );
        if (dataLists.length == 0 || dataLists[0].HPに掲載可否 != "掲載する") {
          this.$router.push("/notFound");
          return;
        }

        var titleEn = "タイトル（英語）";
        var titleKr = "タイトル（韓国）";
        var explanatoryTextEn = "説明文（英語）";
        var explanatoryTextKr = "説明文（韓国）";
        this.copyrightNumber = dataLists[0].商品番号;
        this.image2 = dataLists[0].image2;
        this.image3 = dataLists[0].image3;
        this.copyrightType = dataLists[0].著作権タイプ;
        this.title = dataLists[0].タイトル;
        this.titleEn = dataLists[0].titleEn;
        this.titleKr = dataLists[0].titleKr;
        this.explanatoryText = dataLists[0].説明文;
        this.explanatoryTextEn = dataLists[0].explanatoryTextEn;
        this.explanatoryTextKr = dataLists[0].explanatoryTextKr;
        this.publicationDate = dataLists[0].公表日;
        this.originalAuthorDeathDate = dataLists[0].原作者死亡日;
        this.protectionPeriod = dataLists[0].保護期間;
        this.possessionNotes = dataLists[0].持ち分注意事項;
        this.otherNotes = dataLists[0].その他注意事項;
        this.Tag = dataLists[0].タグ;
        this.applicability = dataLists[0].掲載可否;
        this.applicabilityOnHomepage = dataLists[0].HPに掲載可否;
        this.rightsStartDate = dataLists[0].権利開始日;
        this.rightPeriod = dataLists[0].権利期間;
        this.Seller = dataLists[0].売却者;
        this.managementPublisher = dataLists[0].管理出版社;
        this.totalAmount = dataLists[0].数量;
        this.auctionStatus = dataLists[0].オークション状況;
        this.auctionStartDate = dataLists[0].オークション開始時間;
        this.auctionEndDate = dataLists[0].オークション終了時間;
        this.auctionEndTime = dataLists[0].オークション終了時刻;
        this.auctionAmount = dataLists[0].オークション数量;
        this.auctionStartPrice = dataLists[0].オークション開始金額;
        this.auctionEndPrice = dataLists[0].オークション落札金額;
        this.bidPrice =
          this.myAuctionBidList.length > 0
            ? this.myAuctionBidList[0].入札金額
            : dataLists[0].オークション開始金額;
        this.bidAmount =
          this.myAuctionBidList.length > 0 ? this.myAuctionBidList[0].数量 : 1;
        const image1Binary = dataLists[0].image1;
        if (image1Binary) {
          const ab = await this.$hexalink.getFile(this.token, image1Binary);
          const blob = new Blob([ab], { type: "image/jpeg" });
          this.image1 = window.URL.createObjectURL(blob);
        } else {
          this.image1 = "";
        }

        var rpf_bidAmount = "4384d821-8e19-4e08-949b-44cab6efa408";
        var rpf_copyrightNumber = "d3e553f2-7281-47b7-96ef-3ac55a72f1ee";
        var rpf_bidPrice = "d2813a9b-33e5-405f-9116-ff9c97a0bf06";

        // diffメソッドを使って、日時の差を、ミリ秒で取得
        const diff = moment(
          moment(this.auctionEndDate)
            .tz("Asia/Tokyo")
            .format()
            .slice(0, -14) + this.auctionEndTime
        ).diff(moment());
        if (diff < 0 || this.applicabilityOnHomepage !== "掲載する") {
          this.auctionFinishedFlag = true;
        }

        var auctionLists = [];
        auctionLists = await this.$hexalink.getReports(
          this.token,
          window.env.VUE_APP_APPLICATION_ID,
          window.env.report.VUE_APP_AUCTIONBIDAGGREGATIONREPORT_ID,
          {
            conditions: [
              {
                id: "d3e553f2-7281-47b7-96ef-3ac55a72f1ee",
                search_value: [this.itemId],
                exact_match: true
              }
            ]
          }
        );

        var auctionListsGroupSort = auctionLists.report_results.sort(function(
          a,
          b
        ) {
          if (a[rpf_bidPrice] < b[rpf_bidPrice]) {
            return 1;
          } else {
            return -1;
          }
        });

        var auctionAmountCount = 0;
        var orderOfArraivalFlag = true;

        for (const key in auctionListsGroupSort) {
          auctionAmountCount += Number(
            auctionListsGroupSort[key][rpf_bidAmount]
          );
          if (auctionAmountCount <= dataLists[0].オークション数量) {
            console.log(this.auctionFinishedFlag);
            auctionListsGroupSort[key].落札状況 = this.auctionFinishedFlag
              ? "落札"
              : "落札圏内";
            if (auctionAmountCount >= dataLists[0].オークション数量) {
              orderOfArraivalFlag = false;
            }
          } else if (orderOfArraivalFlag) {
            auctionListsGroupSort[key].落札状況 = this.auctionFinishedFlag
              ? "先着順の部分落札"
              : "先着順の部分落札圏内";
            orderOfArraivalFlag = false;
          } else {
            auctionListsGroupSort[key].落札状況 = "-";
          }
        }
        if (this.myAuctionBidList.length > 0) {
          for (const key in auctionListsGroupSort) {
            if (
              this.myAuctionBidList[0].入札金額 ==
              auctionListsGroupSort[key][rpf_bidPrice]
            ) {
              this.myAuctionResult = auctionListsGroupSort[key].落札状況;
              break;
            }
          }
        }
        this.bidTotalAmount = auctionAmountCount;
        this.auctionListsGroup = auctionListsGroupSort;

        this.loaded = true;

        this.updateMessage();
        this.agreeGuideline = false;

        if (this.token) this.userInfo = await this.getUserInfo();
        if (this.userInfo && this.userInfo.length > 0) {
          // 保管用PDFユーザ情報定義
          this.docDefinition.content.push({
            text:
              this.userInfo[0].郵便番号 +
              this.userInfo[0].都道府県 +
              this.userInfo[0].住所1 +
              this.userInfo[0].住所2,
            style: ""
          });
          this.docDefinition.content.push({
            text: this.userInfo[0].苗字 + this.userInfo[0].名前,
            style: ""
          });
          this.fileName1 =
            "delivery-document1_" + this.userId + "_" + this.itemId;
          this.fileName2 =
            "delivery-document2_" + this.userId + "_" + this.itemId;
          this.fileName3 =
            "delivery-document3_" + this.userId + "_" + this.itemId;
          switch (this.userInfo[0]["ステータス"]) {
            case "申請中":
              this.userStatus = 2;
              break;
            case "承認済み":
              this.userStatus = 3;
              break;
            case "非承認":
            case "凍結中":
              this.userStatus = 4;
              break;
          }
        }
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
    async getUserInfo() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        window.env.table.VUE_APP_USERINFOTABLE_ID,
        {
          conditions: [
            {
              id: "会員番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.userId],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 1,
          use_display_id: true
        }
      );
    },
    applyUserInfo() {
      if (this.token) {
        this.$router
          .push({ name: "UserInfo", params: { fromBid: true } })
          .catch(() => {});
      } else {
        this.$router.push("/registration").catch(() => {});
      }
    },
    confirmDeliveryDocument(type) {
      switch (type) {
        case 1:
          this.confirmDeliveryDocumentFlag1 = true;
          break;
        case 2:
          this.confirmDeliveryDocumentFlag2 = true;
          break;
        case 3:
          this.confirmDeliveryDocumentFlag3 = true;
          break;
      }
    }
  },
  beforeDestroy: function() {
    clearInterval(this.counterInterval);
  }
};
</script>

<style scoped></style>
