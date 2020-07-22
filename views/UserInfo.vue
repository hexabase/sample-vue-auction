<template>
  <div id="page_userInfo" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">個人情報の登録</h2>
        </div>
      </div>
    </header>
    <v-stepper v-model="step">
      <v-stepper-header class="userInfo_nav">
        <v-stepper-step editable complete step="0" @click="step = 0">
          アカウント/通知設定
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable complete step="1" @click="step = 1">
          個人情報
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="false" step="2" @click="step = 2">
          口座情報
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="false" step="3" @click="step = 3">
          投資について
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="false" step="4" @click="step = 4">
          本人確認書類
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="false" step="5" @click="step = 5">
          登録内容確認
        </v-stepper-step>
      </v-stepper-header>
      <!-- MEMO:ユーザー情報（ナビ遷移）の場合: non-linear 付与 -->
      <!-- <v-stepper non-linear>
      <v-stepper-header class="userInfo_nav">
        <v-stepper-step editable step="1">
          アカウント/通知設定
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable complete step="2">
          個人情報
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          口座情報
          <span class="mark-alert"></span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="4">
          投資について
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="5">
          本人確認書類
          <span class="mark-alert"></span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="6">
          登録申請
        </v-stepper-step>
      </v-stepper-header>-->
      <v-stepper-items class="userInfo">
        <v-stepper-content step="0" class="userInfoStep-account">
          <section class="mailSettings">
            <div class="mailSettings_box">
              <h3 class="mailSettings_title">メール通知の設定</h3>
              <div class="mailSettings_item">
                <div class="mailSettings_item_title">
                  入札数量をすべて確保する
                </div>
                <div class="mailSettings_item_body">
                  <v-switch></v-switch>
                </div>
              </div>
              <div class="mailSettings_item">
                <div class="mailSettings_item_title">
                  ユーザーマーケット
                </div>
                <div class="mailSettings_item_body">
                  <v-switch></v-switch>
                </div>
              </div>
              <div class="mailSettings_item">
                <div class="mailSettings_item_title">
                  イベントニュース
                </div>
                <div class="mailSettings_item_body">
                  <v-switch></v-switch>
                </div>
              </div>
            </div>
          </section>
          <section class="accountInfo">
            <h3 class="accountInfo_title">アカウント情報</h3>
            <div class="accountInfo_item">
              <div class="accountInfo_item_title">
                メールアドレス
              </div>
              <div class="accountInfo_item_body">
                sample@mail.address
                <v-btn
                  class="button-secondary"
                  @click="() => (cahangeMailModal = true)"
                >
                  変更
                </v-btn>
              </div>
            </div>
            <div class="accountInfo_item">
              <div class="accountInfo_item_title">
                パスワード
              </div>
              <div class="accountInfo_item_body">
                ********
                <v-btn
                  class="button-secondary"
                  @click="() => (cahangePasswordModal = true)"
                >
                  変更
                </v-btn>
              </div>
            </div>
          </section>
        </v-stepper-content>
        <v-stepper-content step="1" class="userInfoStep-personal">
          <div class="content">
            <div class="userInfo_message">
              <v-alert
                color="#cf0e0e"
                icon="mdi-alert-outline"
                text
                type="info"
              >
                入札を行うには個人情報のご登録が必要です。項目をすべて入力しご登録をお願いします。
              </v-alert>
            </div>
            <div class="userInfo_notice">
              <p class="userInfo_notice_text">
                ※Step4で「本人確認書類」を登録します。先に準備いただくと登録がスムーズに進みます。<br />
                デジカメや携帯電話での撮影、スキャナなどで「本人確認書類」の画像イメージをご用意ください。
              </p>
              <p class="userInfo_notice_subtext">
                <img
                  src="~@/assets/img/identification.png"
                  alt="確認書類イメージ"
                  class="userInfo_notice_img"
                />
                【確認書類】マイナンバーカード両面（または通知カード）、運転免許証（両面）・各種健康保険証・住民票の写し・パスポート・在留カード・印鑑登録証明書のいずれか<br />
                【ファイル形式】JPG、JPEG、GIF、BMP、PNG、TIF、TIFF、PDF（サイズ：6MB以下）
              </p>
            </div>
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.1</span>
                個人情報の登録
              </h3>
              <p class="userInfo_text">
                本サービスをご利用されるご本人の情報を入力してください。
              </p>
              <v-form class="entryForm" @submit.prevent>
                <FormTextfieldName
                  title="お名前"
                  :required="true"
                  :userinfo="userInfo"
                />
                <FormTextfieldName
                  title="お名前（カタカナ）"
                  :required="true"
                  :kana="true"
                  :userinfo="userInfo"
                />
                <FormRadio
                  title="性別"
                  :required="true"
                  :radios="[
                    { value: 'male', label: '男性' },
                    { value: 'female', label: '女性' }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].性別 ? userInfo[0].性別 : 'male'
                  "
                />
                <FormSelect
                  title="国籍"
                  :required="true"
                  :items="countryListName"
                  :value="
                    userInfo[0] && userInfo[0].国籍 ? userInfo[0].国籍 : ''
                  "
                  placeholder="placeholder"
                />
                <FormTextfield
                  title="携帯番号"
                  :required="true"
                  placeholder="例）0312345678 ※ハイフン無し11桁"
                  hint="※ハイフン無し11桁"
                  :value="
                    userInfo[0] && userInfo[0].携帯番号
                      ? userInfo[0].携帯番号
                      : ''
                  "
                />
                <FormSelectDate
                  title="生年月日"
                  :required="true"
                  :birthday="
                    userInfo[0] && userInfo[0].生年月日
                      ? userInfo[0].生年月日
                      : ''
                  "
                  placeholder="選択してください"
                />
                <FormAddress
                  title="ご住所"
                  :required="true"
                  :value="addressInfo"
                />
                <div class="entryForm_footer">
                  <v-btn
                    color="primary"
                    class="button-action"
                    @click="moveStep(2)"
                  >
                    保存して次へ
                  </v-btn>
                </div>
              </v-form>
            </section>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2" class="userInfoStep-bank">
          <div class="content">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.2</span>
                入金口座情報
              </h3>
              <p class="userInfo_text">
                配当金受取の口座を登録してください。※必ずご本人名義の口座を登録してください。
              </p>
              <v-form class="entryForm">
                <FormSelect
                  title="金融機関名"
                  :required="true"
                  :items="bankListName"
                  :value="
                    userInfo[0] && userInfo[0].銀行 ? userInfo[0].銀行 : ''
                  "
                  placeholder="選択してください"
                />
                <FormTextfield
                  title="支店名"
                  :required="true"
                  :value="
                    userInfo[0] && userInfo[0].支店名 ? userInfo[0].支店名 : ''
                  "
                  placeholder="例）渋谷支店"
                  hint=""
                />
                <FormTextfield
                  title="支店番号"
                  :required="true"
                  :value="
                    userInfo[0] && userInfo[0].支店番号
                      ? userInfo[0].支店番号
                      : ''
                  "
                  placeholder="例）123"
                  hint="半角数字"
                />
                <FormRadio
                  title="口座種類"
                  :required="true"
                  :radios="[
                    { value: '0', label: '当座' },
                    { value: '1', label: '普通' }
                  ]"
                />
                <FormTextfield
                  title="口座番号"
                  :required="true"
                  placeholder="例）01234567"
                  hint="数字８桁"
                  :value="
                    userInfo[0] && userInfo[0].口座番号
                      ? userInfo[0].口座番号
                      : ''
                  "
                />
                <FormTextfield
                  title="名義人（カタカナ）"
                  :required="true"
                  placeholder="例）ヤマダタロウ"
                  hint="お名前（カタカナ）と同じ名義にしてください。※全角カナ"
                  :value="
                    userInfo[0] && userInfo[0].名義人 ? userInfo[0].名義人 : ''
                  "
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="moveStep(1)">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn class="button-action" @click="moveStep(3)">
                    保存して次へ
                  </v-btn>
                </div>
              </v-form>
            </section>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3" class="userInfoStep-question">
          <div class="content">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.3</span>
                投資について
              </h3>
              <p class="userInfo_text">
                日本証券業協会の自主規制規則に基づく質問事項となります。すべてお答えください。
              </p>
              <v-form class="entryForm" @submit.prevent>
                <FormCheckbox
                  title="投資経験"
                  class="select-2column"
                  :required="true"
                  :checkboxes="[
                    { value: 'AAA', label: '経験あり' },
                    { value: 'AAB', label: '経験アリ' },
                    { value: 'AAC', label: '経験有り' },
                    { value: 'BBB', label: '経験無し' }
                  ]"
                />
                <FormRadio
                  title="投資目的"
                  class="select-singleLine"
                  :required="true"
                  :radios="[
                    { value: 'AAA', label: '利子・配当等安定収益重視' },
                    { value: 'BBB', label: '経験あり' },
                    { value: 'CCC', label: '経験無し' }
                  ]"
                />
                <FormRadio
                  title="投資期間"
                  class="select-singleLine"
                  :required="true"
                  :radios="[
                    { value: 'AAA', label: '利子・配当等安定収益重視' },
                    { value: 'BBB', label: '経験あり' },
                    { value: 'CCC', label: '経験無し' }
                  ]"
                />
                <FormRadio
                  title="現在の収入形態"
                  class="select-2column"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="現在の年収"
                  class="select-2column"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="現在の金融資産"
                  class="select-2column"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="運用予定額"
                  class="select-2column"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="moveStep(2)">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn class="button-action" @click="moveStep(4)">
                    保存して次へ
                  </v-btn>
                </div>
              </v-form>
            </section>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4" class="userInfoStep-upload">
          <div class="content">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.4</span>
                本人確認書類のアップロード
              </h3>
              <p class="userInfo_text">
                本人確認書類・マイナンバーカード（通知カードも可）のスキャンまたは撮影データをアップロードしてください。<br />
              </p>
              <div class="userInfo_notice">
                <p class="userInfo_notice_subtext">
                  【利用可能な本人確認書類】マイナンバーカード両面（または通知カード）、運転免許証（両面）・各種健康保険証・住民票の写し・パスポート・在留カード・印鑑登録証明書のいずれか<br />
                  【ファイル形式】JPG、JPEG、GIF、BMP、PNG、TIF、TIFF、PDF（サイズ：6MB以下）<br />
                  ※入力した住所と同一である必要があります。※運転免許証は裏面もご提出ください。
                </p>
              </div>
              <v-form class="entryForm">
                <FormFile
                  title="本人確認書類１"
                  :value="identityVerificationDocuments1"
                />
                <FormFile
                  title="本人確認書類２"
                  :value="identityVerificationDocuments2"
                />
                <FormFile
                  title="マイナンバーカード写真１"
                  :value="myNumberCardPicture1"
                />
                <FormFile
                  title="マイナンバーカード写真２"
                  :value="myNumberCardPicture2"
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="moveStep(3)">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn class="button-action" @click="moveStep(5)">
                    保存して次へ
                  </v-btn>
                </div>
              </v-form>
            </section>
          </div>
        </v-stepper-content>
        <v-stepper-content step="5" class="userInfoStep-confirm">
          <section class="userInfo_section">
            <h3 class="userInfo_subTitle">
              <span class="userInfo_titleLabel">Step.5</span>
              登録内容の確認・利用規約
            </h3>
            <p class="userInfo_text">
              以下の内容で登録します。よろしければ利用規約に同意し、登録してください。
            </p>
            <div class="content entryForm">
              <section class="formConfirm">
                <h4 class="formConfirm_title">Step.1&nbsp;個人情報の登録</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      お名前
                    </div>
                    <div class="formConfirm_item_body">
                      山田&nbsp;太郎
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      お名前（カタカナ）
                    </div>
                    <div class="formConfirm_item_body">
                      ヤマダ&nbsp;タロウ
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      性別
                    </div>
                    <div class="formConfirm_item_body">
                      男性
                    </div>
                  </div>
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 1">
                    Step1を修正する
                  </v-btn>
                </div>
              </section>
              <section class="formConfirm">
                <h4 class="formConfirm_title">Step.4&nbsp;本人確認書類</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      確認書類
                    </div>
                    <div class="formConfirm_item_body"></div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      マイナンバーカード
                    </div>
                    <div class="formConfirm_item_body"></div>
                  </div>
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 4">
                    Step4を修正する
                  </v-btn>
                </div>
              </section>
            </div>
            <v-form class="">
              <section class="formEntryBox">
                <h4 class="formEntryBox_title">
                  以上の内容で登録してよろしいですか？
                </h4>
                <p class="formEntryBox_text">
                  よろしければ利用規約に同意いただき登録ボタンを押してください。
                </p>
                <v-checkbox label="利用規約に同意" value="" required />
                <v-checkbox
                  label="個人情報の処理方針に同意"
                  value=""
                  required
                />
                <v-checkbox
                  label="個人情報の収集および利用に同意"
                  value=""
                  required
                />
                <div class="formEntryBox_concent">
                  <p>
                    BATON（以下「会社」）は、会員にサービスを提供するために、会員登録の段階で下記のように個人情報を収集利用します。<br />
                    収集・利用目的<br />
                    -&nbsp;サービスを提供し、利用者の識別と本人かどうか確認<br />
                    -&nbsp;未成年者に対する法定代理人同意を<br />
                    収集アイテム<br />
                    -&nbsp;ID、パスワード、氏名、生年月日、性別、メールアドレス、携帯電話番号、口座番号、住所<br />
                    -&nbsp;法定代理人情報（氏名、生年月日、電子メールアドレス）<br />
                    保有・利用期間<br />
                    退会または収集・利用目的の達成時まで<br />
                    ※お客様は、個人情報の収集・利用に同意しないことができるが、本個人情報は、同社がサービスを提供するために必要な最小限の個人情報であるため、同意を拒否した場合のサービス利用が不可能です
                  </p>
                </div>
                <v-checkbox label="全てに同意する" value="" required />
                <div class="entryForm_footer">
                  <button class="button-action">
                    この内容で登録する
                  </button>
                </div>
              </section>
            </v-form>
          </section>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!-- modal -->
    <div class="modal_wrapper">
      <MyModal
        v-if="completeModal"
        class="modal-bid"
        @close="() => (completeModal = false)"
      >
        <template slot="title">メユーザー情報登録完了</template>
        <div class="userInfoComplete">
          <p class="userInfoComplete_text">
            現在、登録いただいた内容を確認しております。<br />
            承認されるまでもうしばらくお待ち下さい。
          </p>
          <p class="userInfoComplete_subText">
            ※通常３営業日以内に結果をメールにて通知します。
          </p>
        </div>
        <template slot="footer">
          <Button class="button-cancel" @click="() => (completeModal = false)">
            <v-icon>mdi-close</v-icon>
            閉じる
          </Button>
        </template>
      </MyModal>
      <MyModal
        v-if="cahangeMailModal"
        class="modal-bid"
        @close="() => (cahangeMailModal = false)"
      >
        <template slot="title">メールアドレスの変更</template>
        <div v-if="false" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}すでにそのメールアドレスは登録されています
          </v-alert>
        </div>
        <v-form class="modalForm">
          <div class="currentData">
            <div class="currentData_title">現在のメールアドレス：</div>
            <div class="currentData_body">sample@mail.address</div>
          </div>
          <FormTextfield title="新しいメールアドレス" :required="true" />
        </v-form>
        <div v-if="false" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            メールアドレスを変更しました。
          </p>
        </div>
        <template slot="footer">
          <Button class="button-action" :disabled="true" @click="null">
            変更する
          </Button>
        </template>
      </MyModal>
      <MyModal
        v-if="cahangePasswordModal"
        class="modal-bid"
        @close="() => (cahangePasswordModal = false)"
      >
        <template slot="title">パスワードの変更</template>
        <div v-if="false" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <v-form class="modalForm">
          <FormPassfield title="現在のパスワード" :required="true" />
          <FormPassfield title="新しいパスワード" :required="true" />
          <FormPassfield title="新しいパスワード（確認）" :required="true" />
        </v-form>
        <div v-if="false" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            パスワードを変更しました。
          </p>
        </div>
        <template slot="footer">
          <Button class="button-action" :disabled="true" @click="null">
            変更する
          </Button>
        </template>
      </MyModal>
    </div>
  </div>
</template>
<script>
import FormFile from "@/components/parts/form/FormFile.vue";
import FormPassfield from "@/components/parts/form/FormPassfield.vue";
import FormRadio from "@/components/parts/form/FormRadio.vue";
import FormCheckbox from "@/components/parts/form/FormCheckbox.vue";
import FormSelect from "@/components/parts/form/FormSelect.vue";
import FormSelectDate from "@/components/parts/form/FormSelectDate.vue";
import FormAddress from "@/components/parts/form/FormAddress.vue";
import FormTextarea from "@/components/parts/form/FormTextarea.vue";
import FormTextfield from "@/components/parts/form/FormTextfield.vue";
import FormTextfieldName from "@/components/parts/form/FormTextfieldName.vue";
import CountryList from "@/assets/json/countryList.json";
import BankList from "@/assets/json/bankList.json";
import MyModal from "./MyModal.vue";
import axios from "axios";

export default {
  components: {
    FormFile,
    FormPassfield,
    FormRadio,
    FormCheckbox,
    FormSelect,
    FormSelectDate,
    FormAddress,
    FormTextfield,
    FormTextfieldName,
    MyModal
  },
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      step: 1,
      email: "",
      countries: [],
      userInfo: [],
      countryList: CountryList,
      countryListName: [],
      bankList: BankList,
      bankListName: [],
      myNumberCardPicture1: [],
      myNumberCardPicture2: [],
      identityVerificationDocuments1: [],
      identityVerificationDocuments2: [],
      addressInfo: {},
      completeModal: false,
      cahangeMailModal: false,
      cahangePasswordModal: false
    };
  },
  created: async function() {},
  mounted: async function() {
    this.userInfo = await this.getUserInfo();
    this.$set(
      this.addressInfo,
      "zip1",
      this.userInfo[0].郵便番号 ? this.userInfo[0].郵便番号.split("-")[0] : ""
    );
    this.addressInfo.zip2 = this.userInfo[0].郵便番号
      ? this.userInfo[0].郵便番号.split("-")[1]
      : "";
    this.addressInfo.address1 = this.userInfo[0].住所1
      ? this.userInfo[0].住所1
      : "";
    this.addressInfo.address2 = this.userInfo[0].住所2
      ? this.userInfo[0].住所2
      : "";
    this.addressInfo.prefectures = this.userInfo[0].都道府県
      ? this.userInfo[0].都道府県
      : "";

    this.myNumberCardPicture1 = await this.getFileInfo(
      "マイナンバーカード写真_1",
      this.userInfo[0].i_id
    );
    this.myNumberCardPicture2 = await this.getFileInfo(
      "マイナンバーカード写真_2",
      this.userInfo[0].i_id
    );
    this.identityVerificationDocuments1 = await this.getFileInfo(
      "本人確認書類写真_1",
      this.userInfo[0].i_id
    );
    this.identityVerificationDocuments2 = await this.getFileInfo(
      "本人確認書類写真_2",
      this.userInfo[0].i_id
    );
    for (const countryId in this.countryList) {
      this.countryListName.push(this.countryList[countryId].name);
    }
    for (const bankId in this.bankList) {
      this.bankListName.push(this.bankList[bankId].name);
    }
    const defaultConfig = {
      headers: {
        "content-type": "application/json"
      }
    };
    let config = JSON.parse(JSON.stringify(defaultConfig));
    const result = await axios.get(
      `//zipcloud.ibsnet.co.jp/api/search?zipcode=${this.userInfo[0].郵便番号}`,
      config
    );
    console.log(result);
  },
  methods: {
    moveStep(step) {
      this.step = step;
      window.scrollTo({
        top: 190,
        behavior: "smooth"
      });
    },
    async getUserInfo() {
      return await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["ユーザDB"],
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
    async getFileInfo(fileField, itemId) {
      const itemInfo = await this.$hexalink.getItem(
        this.token,
        this.datastoreIds["ユーザDB"],
        itemId
      );
      const fileBinary = this.userInfo[0][fileField];
      if (fileBinary) {
        const ab = await this.$hexalink.getFile(this.token, fileBinary);
        var fileInfo = [];
        for (var i = 0; itemInfo.length > i; i++) {
          if (itemInfo[i].field_id == fileField) {
            fileInfo = itemInfo[i].value[0];
            break;
          }
        }
        return [
          new File([ab], fileInfo.filename, {
            type: "image/jpeg",
            lastModified: 0
          })
        ];
      }
    }
  }
};
</script>
