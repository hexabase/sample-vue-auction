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
        <v-stepper-step step="1">個人情報の登録</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">口座情報の登録</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">投資について</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">本人確認書類のアップロード</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items class="userInfo">
        <div class="content">
          <v-stepper-content step="1">
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
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.1</span>
                個人情報の登録
              </h3>
              <p class="userInfo_text">
                本サービスをご利用されるご本人の情報を入力してください。
              </p>
              <v-form class="entryForm">
                <FormTextfieldName title="お名前" :required="true" />
                <FormTextfieldName
                  title="お名前（カタカナ）"
                  :required="true"
                  :kana="true"
                />
                <FormRadio
                  title="性別"
                  :required="true"
                  :radios="[
                    { value: 'male', label: '男性' },
                    { value: 'female', label: '女性' }
                  ]"
                />
                <FormSelect
                  title="国籍"
                  :required="true"
                  :items="['日本', '中国', '大韓民国']"
                  placeholder="placeholder"
                  hint="hint"
                />
                <FormTextfield
                  title="携帯番号"
                  :required="true"
                  placeholder="placeholder"
                  hint="hint"
                />
                <FormSelectDate
                  title="生年月日"
                  :required="true"
                  placeholder="選択してください"
                  hint="hint"
                />
                <FormAddress title="ご住所" :required="true" />
                <div class="entryForm_footer">
                  <button class="button-action" @click="step = 2">
                    次へ
                  </button>
                </div>
              </v-form>
            </section>
          </v-stepper-content>
          <v-stepper-content step="2">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.2</span>
                入金口座情報
              </h3>
              <p class="userInfo_text">
                配当金受取の口座を登録してください。※必ずご本人名義の口座を登録してください。
              </p>
              <v-form class="entryForm">
                <FormRadio
                  title="金融機関名"
                  :required="true"
                  :radios="[
                    { value: 'UFJ', label: 'UFJ銀行' },
                    { value: 'SMBC', label: '三井住友銀行' }
                  ]"
                />
                <FormTextfield
                  title="支店名"
                  :required="true"
                  placeholder="placeholder"
                  hint="hint"
                />
                <FormTextfield
                  title="支店番号"
                  :required="true"
                  placeholder="placeholder"
                  hint="hint"
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
                  placeholder="placeholder"
                  hint="hint"
                />
                <FormTextfield
                  title="名義人"
                  :required="true"
                  placeholder="placeholder"
                  hint="hint"
                />
                <div class="entryForm_footer">
                  <button class="button-cancel">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </button>
                  <button class="button-action">
                    次へ
                  </button>
                </div>
              </v-form>
            </section>
          </v-stepper-content>
          <v-stepper-content step="3">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.3</span>
                投資について
              </h3>
              <p class="userInfo_text">
                日本証券業協会の自主規制規則に基づく質問事項となります。すべてお答えください。
              </p>
              <v-form class="entryForm">
                <FormCheckbox
                  title="投資経験"
                  :required="true"
                  :checkboxes="[
                    { value: 'AAA', label: '経験あり' },
                    { value: 'BBB', label: '経験無し' }
                  ]"
                />
                <FormRadio
                  title="投資目的"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="投資期間"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="現在の収入形態"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="現在の年収"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="現在の金融資産"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <FormRadio
                  title="運用予定額"
                  :required="true"
                  :radios="[{ value: 'AAA', label: 'AAA' }]"
                />
                <div class="entryForm_footer">
                  <button class="button-cancel">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </button>
                  <button class="button-action">
                    次へ
                  </button>
                </div>
              </v-form>
            </section>
          </v-stepper-content>
          <v-stepper-content step="4">
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span class="userInfo_titleLabel">Step.4</span>
                本人確認書類のアップロード
              </h3>
              <p class="userInfo_text">
                本人確認書類・マイナンバーカード（通知カードも可）のスキャンまたは撮影データをアップロードしてください。<br />
                【利用可能な本人確認書類】運転免許証・各種健康保険証・住民票の写し…<br />
                ※入力した住所と同一である必要があります<br />
                ※運転免許証は裏面もご提出ください。
              </p>
              <v-form class="entryForm">
                <FormFile title="本人確認書類１" />
                <FormFile title="本人確認書類２" />
                <FormFile title="マイナンバーカード写真１" />
                <FormFile title="マイナンバーカード写真２" />
                <div class="entryForm_footer">
                  <button class="button-cancel">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </button>
                  <button class="button-action">
                    次へ
                  </button>
                </div>
              </v-form>
            </section>
          </v-stepper-content>
        </div>
      </v-stepper-items>
    </v-stepper>
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

export default {
  components: {
    FormFile,
    // FormPassfield,
    FormRadio,
    FormCheckbox,
    FormSelect,
    FormSelectDate,
    FormAddress,
    FormTextfield,
    FormTextfieldName
  },
  data() {
    return {
      step: 1,
      email: "",
      countries: []
    };
  },
  created: async function() {},
  mounted: async function() {},
  methods: {}
};
</script>
