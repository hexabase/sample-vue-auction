<template>
  <div id="page_userInfo" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">個人情報の登録</h2>
        </div>
      </div>
    </header>
    <v-stepper
      v-model="step"
      non-linear
      :alt-labels="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    >
      <div class="v-stepper__header_wrap">
        <v-stepper-header class="userInfo_nav">
          <v-stepper-step
            v-if="!stepControl.fromBid"
            :editable="stepControl.step.step0.editable"
            :complete="stepControl.step.step0.complete"
            step="0"
          >
            アカウント/通知設定
          </v-stepper-step>
          <v-divider v-if="!stepControl.fromBid"></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step1.editable"
            :complete="stepControl.step.step1.complete"
            step="1"
          >
            個人情報
            <span
              v-if="!stepControl.fromBid && !stepControl.step.step1.complete"
              class="mark-alert"
            ></span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step2.editable"
            :complete="stepControl.step.step2.complete"
            step="2"
          >
            口座情報
          </v-stepper-step>
          <v-divider></v-divider>
          <!-- <v-stepper-step
            :editable="stepControl.step.step3.editable"
            :complete="stepControl.step.step3.complete"
            step="3"
          >
            投資について
          </v-stepper-step> -->
          <v-divider v-if="!approvedFlag"></v-divider>
          <v-stepper-step
            v-if="!approvedFlag"
            :editable="stepControl.step.step4.editable"
            :complete="stepControl.step.step4.complete"
            step="4"
          >
            本人確認書類
            <span
              v-if="!stepControl.fromBid && !stepControl.step.step4.complete"
              class="mark-alert"
            ></span>
          </v-stepper-step>
          <v-divider v-if="!approvedFlag"></v-divider>
          <v-stepper-step
            v-if="!approvedFlag"
            :editable="stepControl.step.step5.editable"
            :complete="stepControl.step.step5.complete"
            step="5"
          >
            {{ stepControl.fromBid ? "登録内容確認" : "登録申請" }}
            <span
              v-if="
                !stepControl.fromBid &&
                  stepControl.step.step1.complete &&
                  stepControl.step.step4.complete &&
                  !stepControl.step.step5.complete
              "
              class="mark-alert"
            >
            </span>
          </v-stepper-step>
        </v-stepper-header>
      </div>
      <v-stepper-items class="userInfo">
        <v-stepper-content step="0" class="userInfoStep-account">
          <section class="mailSettings">
            <div class="mailSettings_box">
              <h3 class="mailSettings_title">メール通知の設定</h3>
              <!-- <div class="mailSettings_item">
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
              </div> -->
              <div class="mailSettings_item">
                <div class="mailSettings_item_title">
                  イベントニュース
                </div>
                <div class="mailSettings_item_body">
                  <v-switch
                    :input-value="mailMagazine"
                    @change="switchMailMagazine"
                  ></v-switch>
                </div>
              </div>
            </div>
          </section>
          <section class="accountInfo">
            <h3 class="accountInfo_title">アカウント情報</h3>
            <div class="accountInfo_item">
              <div class="accountInfo_item_title">
                ニックネーム
              </div>
              <div class="accountInfo_item_body">
                {{ currentNickname }}
                <v-btn
                  class="button-secondary"
                  @click="() => (changeNicknameModal = true)"
                >
                  変更
                </v-btn>
              </div>
            </div>
            <div class="accountInfo_item">
              <div class="accountInfo_item_title">
                メールアドレス
              </div>
              <div class="accountInfo_item_body">
                {{ email }}
                <v-btn
                  class="button-secondary"
                  @click="() => (changeMailModal = true)"
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
                  @click="() => (changePasswordModal = true)"
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
                【ファイル形式】JPG、JPEG、GIF、BMP、PNG、TIF、TIFF、PDF（サイズ：3MB以下）
              </p>
            </div>
            <section class="userInfo_section">
              <h3 class="userInfo_subTitle">
                <span v-if="stepControl.fromBid" class="userInfo_titleLabel">
                  Step.1
                </span>
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
                  :editable="!approvedFlag"
                  @input="emittedNameKanji"
                />
                <FormTextfieldName
                  title="お名前（カタカナ）"
                  :required="true"
                  :kana="true"
                  :userinfo="userInfo"
                  :editable="!approvedFlag"
                  @input="emittedNameKana"
                />
                <FormRadio
                  title="性別"
                  :required="true"
                  :radios="[
                    {
                      value: 'a9b8e4d5-7597-42c5-9253-449d18f8debc',
                      label: '男性'
                    },
                    {
                      value: '4da9cad5-cb58-4f8d-8585-6bf216b206e4',
                      label: '女性'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userGender
                      ? userGender
                      : 'a9b8e4d5-7597-42c5-9253-449d18f8debc'
                  "
                  :editable="!approvedFlag"
                  @change="emittedGender"
                />
                <FormSelect
                  title="国籍"
                  :required="true"
                  :items="countryListName"
                  :value="
                    userInfo[0] && userInfo[0].国籍 ? userInfo[0].国籍 : ''
                  "
                  :editable="!approvedFlag"
                  placeholder="placeholder"
                  @input="emittedCountry"
                />
                <FormTextfield
                  title="携帯番号"
                  digits="11"
                  :required="true"
                  placeholder="例）0312345678 ※ハイフン無し11桁"
                  hint="※ハイフン無し11桁"
                  :value="userInfo[0].携帯番号"
                  :number="true"
                  @input="emittedMobilePhoneNumber"
                  :keydown="multipleHandler"
                />
                <FormSelectDate
                  title="生年月日"
                  :required="true"
                  :birthday="
                    userInfo[0] && userInfo[0].生年月日
                      ? userInfo[0].生年月日
                      : ''
                  "
                  :editable="!approvedFlag"
                  placeholder="選択してください"
                  @input="emittedBirthday"
                  :class="{ approved: approvedFlag }"
                />
                <FormAddress
                  title="ご住所"
                  :required="true"
                  :value="addressInfo"
                  @input="emittedAddress"
                />
                <div class="entryForm_footer">
                  <v-btn
                    v-if="!approvedFlag"
                    color="primary"
                    class="button-action"
                    @click="moveStep(2)"
                  >
                    保存して次へ
                  </v-btn>
                  <v-btn
                    v-if="approvedFlag"
                    class="button-action"
                    @click="moveStep(2)"
                  >
                    保存
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
                <span v-if="stepControl.fromBid" class="userInfo_titleLabel">
                  Step.2
                </span>
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
                  @input="emittedBankName"
                />
                <FormTextfield
                  title="支店名"
                  :required="true"
                  :value="
                    userInfo[0] && userInfo[0].支店名 ? userInfo[0].支店名 : ''
                  "
                  placeholder="例）渋谷支店"
                  hint=""
                  @input="emittedBranchBankName"
                />
                <FormTextfield
                  title="支店番号"
                  digits="3"
                  :number="true"
                  :required="true"
                  :value="
                    userInfo[0] && userInfo[0].支店番号
                      ? userInfo[0].支店番号
                      : ''
                  "
                  placeholder="例）123"
                  hint="半角数字"
                  @input="emittedBranchBankNumber"
                  :keydown="multipleHandler"
                />
                <FormRadio
                  title="口座種類"
                  :required="true"
                  :radios="[
                    {
                      value: '3e409316-0591-4a43-a5a8-4ce9f0203e7f',
                      label: '普通'
                    },
                    {
                      value: 'b01a89fc-4017-42c6-8c7f-f3ebd1bc6084',
                      label: '当座'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userBankAccountType
                      ? userBankAccountType
                      : '3e409316-0591-4a43-a5a8-4ce9f0203e7f'
                  "
                  @change="emittedBankAccountType"
                />
                <FormTextfield
                  title="口座番号"
                  digits="8"
                  :number="true"
                  :required="true"
                  placeholder="例）01234567"
                  hint="数字８桁"
                  :value="
                    userInfo[0] && userInfo[0].口座番号
                      ? userInfo[0].口座番号
                      : ''
                  "
                  @input="emittedBankAccountNumber"
                  :keydown="multipleHandler"
                />
                <FormTextfield
                  title="名義人（カタカナ）"
                  :required="true"
                  placeholder="例）ヤマダタロウ"
                  hint="お名前（カタカナ）と同じ名義にしてください。※全角カナ"
                  :value="
                    userInfo[0] && userInfo[0].名義人 ? userInfo[0].名義人 : ''
                  "
                  :editable="!approvedFlag"
                  @input="emittedBankAccountHolderKana"
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="step = 1">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn
                    v-if="!approvedFlag"
                    class="button-action"
                    @click="moveStep(3)"
                  >
                    保存して次へ
                  </v-btn>
                  <v-btn
                    v-if="approvedFlag"
                    class="button-action"
                    @click="moveStep(3)"
                  >
                    保存
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
                <span v-if="stepControl.fromBid" class="userInfo_titleLabel">
                  Step.3
                </span>
                投資について
              </h3>
              <p class="userInfo_text">
                日本証券業協会の自主規制規則に基づく質問事項となります。すべてお答えください。
              </p>
              <v-form class="entryForm" @submit.prevent>
                <FormCheckbox
                  title="投資経験"
                  class="select-2column"
                  v-model="selectedInvestmentExperience"
                  :required="true"
                  :checkboxes="[
                    { value: '国内株式', label: '国内株式' },
                    { value: '国内債券', label: '国内債券' },
                    { value: '外貨預金', label: '外貨預金' },
                    { value: '外国株式', label: '外国株式' },
                    { value: '外国債権', label: '外国債権' },
                    { value: '投資信託', label: '投資信託' },
                    { value: '先物・オプション', label: '先物・オプション' },
                    { value: 'なし', label: 'なし' }
                  ]"
                  @change="emittedInvestmentExperience"
                />
                <FormRadio
                  title="投資目的"
                  class="select-singleLine"
                  :required="true"
                  :radios="[
                    {
                      value: '利子・配当等安定収益重視',
                      label: '利子・配当等安定収益重視'
                    },
                    { value: '値上がり益重視', label: '値上がり益重視' },
                    {
                      value: '安定収益・値上がり益のバランス投資',
                      label: '安定収益・値上がり益のバランス投資'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].投資目的_投資方針
                      ? userInfo[0].投資目的_投資方針
                      : '利子・配当等安定収益重視'
                  "
                  @change="emittedInvestmentPurpose"
                />
                <FormRadio
                  title="投資期間"
                  class="select-singleLine"
                  :required="true"
                  :radios="[
                    { value: '長期運用', label: '長期運用' },
                    { value: '中期運用', label: '中期運用' },
                    { value: '短期運用', label: '短期運用' }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].投資目的_投資期間
                      ? userInfo[0].投資目的_投資期間
                      : '長期運用'
                  "
                  @change="emittedInvestmentPeriod"
                />
                <FormRadio
                  title="現在の収入形態"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '給与収入', label: '給与収入' },
                    { value: '事業収入', label: '事業収入' },
                    { value: '不動産収入', label: '不動産収入' },
                    { value: '利子・配当収入', label: '利子・配当収入' },
                    { value: '年金', label: '年金' },
                    { value: 'なし', label: 'なし' },
                    { value: 'その他', label: 'その他' }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].現在の収入形態
                      ? userInfo[0].現在の収入形態
                      : '給与収入'
                  "
                  @change="emittedIncomeForm"
                />
                <FormRadio
                  title="現在の年収"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '百万円未満', label: '百万円未満' },
                    {
                      value: '百万円～２百万円未満',
                      label: '百万円～２百万円未満'
                    },
                    {
                      value: '２百万円～３百万円未満',
                      label: '２百万円～３百万円未満'
                    },
                    {
                      value: '３百万円～４百万円未満',
                      label: '３百万円～４百万円未満'
                    },
                    {
                      value: '４百万円～５百万円未満',
                      label: '４百万円～５百万円未満'
                    },
                    {
                      value: '５百万円以上',
                      label: '５百万円以上'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].現在の年収
                      ? isNaN(userInfo[0].現在の年収)
                        ? userInfo[0].現在の年収
                        : '百万円未満'
                      : '百万円～２百万円未満'
                  "
                  @change="emittedAnnualIncome"
                />
                <div
                  v-if="selectedAnnualIncome === '百万円未満'"
                  class="subFormBox"
                >
                  ※百万円未満を選択されたかたは年収額を入力してください。
                  <v-text-field
                    v-model="incomeValue"
                    :rules="incomeValueRules"
                    dense
                    outlined
                    single-line
                    step="1"
                    type="number"
                    suffix="円"
                  ></v-text-field>
                </div>
                <FormRadio
                  title="現在の金融資産"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '百万円未満', label: '百万円未満' },
                    {
                      value: '百万円～２百万円未満',
                      label: '百万円～２百万円未満'
                    },
                    {
                      value: '２百万円～３百万円未満',
                      label: '２百万円～３百万円未満'
                    },
                    {
                      value: '３百万円～４百万円未満',
                      label: '３百万円～４百万円未満'
                    },
                    {
                      value: '４百万円～５百万円未満',
                      label: '４百万円～５百万円未満'
                    },
                    {
                      value: '５百万円以上',
                      label: '５百万円以上'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].現在の金融資産
                      ? userInfo[0].現在の金融資産
                      : '百万円～２百万円未満'
                  "
                  @change="emittedFinancialAssets"
                />
                <FormRadio
                  title="運用予定額"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '百万円未満', label: '百万円未満' },
                    {
                      value: '百万円～２百万円未満',
                      label: '百万円～２百万円未満'
                    },
                    {
                      value: '２百万円～３百万円未満',
                      label: '２百万円～３百万円未満'
                    },
                    {
                      value: '３百万円～４百万円未満',
                      label: '３百万円～４百万円未満'
                    },
                    {
                      value: '４百万円～５百万円未満',
                      label: '４百万円～５百万円未満'
                    },
                    {
                      value: '５百万円以上',
                      label: '５百万円以上'
                    }
                  ]"
                  :radiochecked="
                    userInfo[0] && userInfo[0].運用予定額
                      ? userInfo[0].運用予定額
                      : '百万円～２百万円未満'
                  "
                  @change="emittedPlannedInvestmentAmount"
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="step = 2">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn
                    v-if="!approvedFlag"
                    class="button-action"
                    @click="moveStep(4)"
                  >
                    保存して次へ
                  </v-btn>
                  <v-btn
                    v-if="approvedFlag"
                    class="button-action"
                    @click="moveStep(4)"
                  >
                    保存
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
                <span v-if="stepControl.fromBid" class="userInfo_titleLabel">
                  Step.4
                </span>
                本人確認書類のアップロード
              </h3>
              <p class="userInfo_text">
                お使いのパソコンまたはスマートフォンに内蔵されているカメラを使って撮影します。<br />
                ※カメラ内臓のデバイスをご利用ください。
              </p>
              <v-form class="entryForm photoUpload" @submit.prevent>
                <div class="formItem">
                  <div class="formItem_title">
                    本人顔写真アップロード
                    <span class="formItem_required">※必須</span>
                  </div>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      顔の正面を撮影してください。
                    </div>
                    <figure
                      v-if="identityPhoto1Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="identityPhoto1Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow1.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="identityPhoto1Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(1)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(1)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      横顔を撮影してください。
                    </div>
                    <figure
                      v-if="identityPhoto2Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="identityPhoto2Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow2.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="identityPhoto2Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(2)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(2)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                </div>
                <div class="formItem">
                  <div class="formItem_title">
                    本人確認書類アップロード
                    <span class="formItem_required">※必須</span>
                  </div>
                  <p class="formItem_text">
                    【利用可能な本人確認書類】運転免許証・マイナンバーカード、パスポート・在留カードのいずれかとなります。<br />
                    ※必ず顔写真があるものをご使用ください。
                  </p>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      おもて面を撮影してください。
                    </div>
                    <figure
                      v-if="identityVerificationDocuments1Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="identityVerificationDocuments1Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow3.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="identityVerificationDocuments1Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(3)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(3)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      斜めに向けて撮影してください。
                    </div>
                    <p class="photoUpload_text">
                      ※書類の厚みを撮影するため斜めに向けて撮影する必要があります。
                    </p>
                    <figure
                      v-if="identityVerificationDocuments3Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="identityVerificationDocuments3Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow4.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="identityVerificationDocuments3Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(4)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(4)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      裏面を撮影してください。
                    </div>
                    <figure
                      v-if="identityVerificationDocuments2Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="identityVerificationDocuments2Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow5.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="identityVerificationDocuments2Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(5)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(5)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                </div>
                <div class="formItem">
                  <div class="formItem_title">
                    マイナンバーアップロード
                    <span class="formItem_required">※必須</span>
                  </div>
                  <p class="formItem_text">
                    マイナンバーカード、もしくは通知カードを撮影してください。
                  </p>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      表面を撮影してください。
                    </div>
                    <figure
                      v-if="myNumberCardPicture1Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="myNumberCardPicture1Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow6.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="myNumberCardPicture1Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(6)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(6)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                  <div class="photoUpload_box">
                    <div class="photoUpload_title">
                      裏面を撮影してください。
                    </div>
                    <figure
                      v-if="myNumberCardPicture2Image.length > 0"
                      class="photoUpload_photo"
                    >
                      <img :src="myNumberCardPicture2Image" />
                      <v-icon>mdi-check-bold</v-icon>
                    </figure>
                    <figure v-else class="photoUpload_img">
                      <img src="~@/assets/img/photo-flow7.png" alt="" />
                    </figure>
                    <v-btn
                      v-if="myNumberCardPicture2Image.length > 0"
                      class="button-secondary"
                      @click="openPhotoModal(7)"
                    >
                      撮り直す
                    </v-btn>
                    <v-btn
                      v-else
                      class="button-action"
                      @click="openPhotoModal(7)"
                    >
                      <v-icon>mdi-camera</v-icon>
                      撮影する
                    </v-btn>
                  </div>
                </div>

                <!-- <FormFile
                  id="本人確認書類写真_1"
                  title="本人確認書類写真1"
                  :value="identityVerificationDocuments1"
                  text="運転免許証（両面）・各種健康保険証・住民票の写し・パスポート・在留カード・印鑑登録証明書のいずれか。※入力した住所と同一である必要があります"
                  :required="true"
                  @change="emittedFile"
                />
                <FormFile
                  id="本人確認書類写真_2"
                  title="本人確認書類写真2"
                  text="※運転免許証の場合、裏面もアップロードしてください"
                  :value="identityVerificationDocuments2"
                  @change="emittedFile"
                />
                <FormFile
                  id="マイナンバーカード写真_1"
                  title="マイナンバーカード写真1"
                  :value="myNumberCardPicture1"
                  :required="true"
                  @change="emittedFile"
                />
                <FormFile
                  id="マイナンバーカード写真_2"
                  title="マイナンバーカード写真2"
                  :value="myNumberCardPicture2"
                  @change="emittedFile"
                /> -->
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="step = 3">
                    <v-icon>mdi-chevron-left</v-icon>
                    戻る
                  </v-btn>
                  <v-btn
                    v-if="!approvedFlag"
                    class="button-action"
                    @click="moveStep(5)"
                  >
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
              <span v-if="stepControl.fromBid" class="userInfo_titleLabel">
                Step.5
              </span>
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
                      {{ userSeiKanji }}&nbsp;{{ userMeiKanji }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      お名前（カタカナ）
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userSeiKana }}&nbsp;{{ userMeiKana }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      性別
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userGenderConfirm }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      国籍
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userCountry }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      携帯番号
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userMobilePhoneNumber }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      生年月日
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBirthdayYMD }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      ご住所
                    </div>
                    <div class="formConfirm_item_body">
                      〒&nbsp;{{ userPostalCode }}<br />
                      {{ userPrefectures }}<br />
                      {{ userAddress1 }}<br />
                      {{ userAddress2 }}
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
                <h4 class="formConfirm_title">Step.2&nbsp;入金口座情報</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      金融機関名
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBankName }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      支店名
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBranchBankName }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      支店番号
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBranchBankNumber }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      口座種類
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBankAccountTypeConfirm }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      口座番号
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBankAccountNumber }}
                    </div>
                  </div>
                  <div v-if="!userNameJudgment" class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      名義人（カタカナ）
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBankAccountHolderKana }}
                      <span class="formConfirm_alert">
                        ※登録後は変更できません
                      </span>
                    </div>
                  </div>
                  <div v-if="userNameJudgment" class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      名義人（カタカナ）
                    </div>
                    <div class="formConfirm_item_body">
                      {{ userBankAccountHolderKana }}
                      <span class="formConfirm_alert">
                        ※お名前（カタカナ）と同じ名義にしてください
                      </span>
                    </div>
                  </div>
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 2">
                    Step2を修正する
                  </v-btn>
                </div>
              </section>
              <section class="formConfirm">
                <h4 class="formConfirm_title">Step.3&nbsp;投資について</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      投資経験
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedInvestmentExperience }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      投資目的
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedInvestmentPurpose }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      投資期間
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedInvestmentPeriod }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      現在の収入形態
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedIncomeForm }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      現在の年収
                    </div>
                    <div class="formConfirm_item_body">
                      {{
                        selectedAnnualIncome === "百万円未満"
                          ? incomeValue
                          : selectedAnnualIncome
                      }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      現在の金融資産
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedFinancialAssets }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      運用予定額
                    </div>
                    <div class="formConfirm_item_body">
                      {{ selectedPlannedInvestmentAmount }}
                    </div>
                  </div>
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 3">
                    Step3を修正する
                  </v-btn>
                </div>
              </section>
              <section class="formConfirm">
                <h4 class="formConfirm_title">Step.4&nbsp;本人確認書類</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人顔写真 正面
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityPhoto1Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人顔写真 横顔
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityPhoto2Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人確認書類写真 表面
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityVerificationDocuments1Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人確認書類写真 斜め
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityVerificationDocuments3Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人確認書類写真 裏面
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityVerificationDocuments2Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      マイナンバーカード写真1
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="myNumberCardPicture1Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      マイナンバーカード写真2
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="myNumberCardPicture2Image" />
                    </div>
                  </div>
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 4">
                    Step4を修正する
                  </v-btn>
                </div>
              </section>
            </div>
            <v-form class="" @submit.prevent>
              <section class="formEntryBox">
                <h4 class="formEntryBox_title">
                  以上の内容で登録してよろしいですか？
                </h4>
                <p class="formEntryBox_text">
                  よろしければ利用規約に同意いただき登録ボタンを押してください。
                </p>
                <div class="formEntryBox_concent">
                  <p class="formEntryBox_concent_title">利用規約</p>
                  <Terms />
                  <Privacy />
                </div>
                <v-checkbox
                  v-model="checkedAgreements"
                  label="利用規約及び個人情報の取扱いに同意"
                  value="1"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="所得税法第224条に基づき、氏名・住所・個人番号の告知に同意"
                  value="2"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="電磁的方法による情報提供の同意"
                  value="3"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="反社会的勢力ではないことの表明・確約に同意"
                  value="4"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="米国の永住権をお持ちではないことの表明・確約に同意"
                  value="5"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="外国PEPsに該当しないことの表明・確約に同意"
                  value="6"
                  required
                />
                <div class="entryForm_footer">
                  <button
                    class="button-action"
                    :disabled="
                      checkedAgreements.length !== 6 || userNameJudgment
                    "
                    @click="applyMember"
                  >
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
        class="modal-bid modal-hideBack"
        @close="() => (completeModal = false)"
      >
        <template slot="title">ユーザー情報登録完了</template>
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
      <MyModal v-if="changeNicknameModal" class="modal-bid" @close="closeModal">
        <template slot="title">ニックネームの変更</template>
        <div v-if="errorMess" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <v-form class="modalForm">
          <div class="currentData">
            <div class="currentData_title">現在のニックネーム：</div>
            <div class="currentData_body">
              {{ currentNickname }}
            </div>
          </div>
          <FormTextfield
            v-model="newNickname"
            title="新しいニックネーム"
            :required="true"
            :counter="10"
          />
        </v-form>
        <div v-if="nicknameSendResult" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            ニックネームを変更しました。
          </p>
        </div>
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="nicknameChangeDisable"
            @click="setNickname"
          >
            変更する
          </Button>
        </template>
      </MyModal>
      <MyModal v-if="changeMailModal" class="modal-bid" @close="closeModal">
        <template slot="title">メールアドレスの変更</template>
        <div v-if="errorMess" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <v-form class="modalForm">
          <div class="currentData">
            <div class="currentData_title">現在のメールアドレス：</div>
            <div class="currentData_body">
              {{ email }}
            </div>
          </div>
          <!-- <FormPassfield
            v-model="oldPassword"
            title="現在のパスワード"
            placeholder="個人情報保護のためパスワード確認"
            :required="true"
          /> -->
          <FormTextfield
            v-model="newEmail"
            title="新しいメールアドレス"
            :required="true"
          />
          <FormTextfield
            v-model="reNewEmail"
            title="確認用メールアドレス"
            :required="true"
          />
        </v-form>
        <div v-if="!mailSendResult" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            メールアドレス変更申請を行いました。
          </p>
        </div>
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="mailAddressChangeDisable"
            @click="setMailAddress"
          >
            変更する
          </Button>
        </template>
      </MyModal>
      <MyModal v-if="changePasswordModal" class="modal-bid" @close="closeModal">
        <template slot="title">パスワードの変更</template>
        <div v-if="errorMess" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <v-form class="modalForm">
          <FormPassfield
            v-model="oldPassword"
            title="現在のパスワード"
            :required="true"
          />
          <FormPassfield
            v-model="newPassword"
            title="新しいパスワード"
            :required="true"
            :counter="20"
          />
          <FormPassfield
            v-model="confirmPassword"
            title="新しいパスワード（確認）"
            :required="true"
            :counter="20"
          />
        </v-form>
        <span>
          パスワードは8~20文字の半角英数の組み合わせで入力してください
        </span>
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="passwordChangeDisable"
            @click="setPassword"
          >
            変更する
          </Button>
        </template>
      </MyModal>
      <MyModal v-if="!passwordSendResult" class="modal-bid" @close="closeModal">
        <template slot="title">パスワードの変更</template>
        <div v-if="errorMess" class="error_msg">
          <v-alert text color="red">
            {{ errorMess }}
          </v-alert>
        </div>
        <div class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            パスワードを変更しました。
          </p>
        </div>
      </MyModal>
      <MyModal v-if="photoModal" class="modal-photo" @close="closeModal">
        <template slot="title">
          {{ photoTitle[currentPhotoType] }}
        </template>
        <figure v-if="photoFlow === 1" class="modal-photo_img">
          <img
            v-if="currentPhotoType === 1"
            src="~@/assets/img/photo-flow1.png"
          />
          <img
            v-if="currentPhotoType === 2"
            src="~@/assets/img/photo-flow2.png"
          />
          <img
            v-if="currentPhotoType === 3"
            src="~@/assets/img/photo-flow3.png"
          />
          <img
            v-if="currentPhotoType === 4"
            src="~@/assets/img/photo-flow4.png"
          />
          <img
            v-if="currentPhotoType === 5"
            src="~@/assets/img/photo-flow5.png"
          />
          <img
            v-if="currentPhotoType === 6"
            src="~@/assets/img/photo-flow6.png"
          />
          <img
            v-if="currentPhotoType === 7"
            src="~@/assets/img/photo-flow7.png"
          />
        </figure>
        <div v-show="photoFlow === 2" class="modal-photo_camera">
          <div>
            <div class="modal-photo_flame">
              <video ref="video" id="video" muted autoplay playsinline></video>
            </div>
          </div>
        </div>
        <div v-show="photoFlow === 3" class="modal-photo_confirm">
          <div class="modal-photo_flame">
            <canvas ref="canvas" id="canvas" width="260" height="260"></canvas>
            <!-- <canvas ref="canvas" id="canvas" width="260" height="195"></canvas> -->
          </div>
          <!-- <ul>
            <li class="capture" v-for="c in captures" v-bind:key="c.d">
              <img v-bind:src="c" height="50" />
            </li>
          </ul> -->
          <div class="modal-photo_complete">
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            撮影しました
          </div>
        </div>
        <div class="modal-photo-footer">
          <v-btn
            v-if="photoFlow !== 3"
            class="button-cancel"
            @click="closeModal"
          >
            キャンセル
          </v-btn>
          <v-btn
            v-if="photoFlow === 3"
            class="button-cancel"
            @click="photoFlow = 2"
          >
            撮影し直す
          </v-btn>
          <v-btn
            v-if="photoFlow === 1"
            @click="confirmCapture(2)"
            class="button-action"
          >
            <v-icon>mdi-camera</v-icon>
            カメラを起動
          </v-btn>
          <v-btn
            v-if="photoFlow === 2"
            @click="capture(3)"
            class="button-action"
          >
            <v-icon>mdi-camera</v-icon>
            撮影する
          </v-btn>
          <v-btn
            v-if="photoFlow === 3"
            class="button-action"
            @click="closeModal"
          >
            OK
          </v-btn>
        </div>
      </MyModal>
    </div>
  </div>
</template>
<script>
// import FormFile from "@/components/parts/form/FormFile.vue";
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
import moment from "moment";
import Terms from "./Terms.vue";
import Privacy from "./Privacy.vue";

export default {
  components: {
    FormPassfield,
    FormRadio,
    FormCheckbox,
    FormSelect,
    FormSelectDate,
    FormAddress,
    FormTextfield,
    FormTextfieldName,
    MyModal,
    Terms,
    Privacy
  },
  props: ["fromBid"],
  data() {
    return {
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      fields: this.$store.getters["datas/getFields"],
      userId: this.$store.getters["user/getMembershipNumber"],
      step: 1,
      errorMess: "",
      email: this.$store.getters["user/getEmail"],
      currentNickname: "",
      newNickname: "",
      newEmail: "",
      reNewEmail: "",
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
      passwordSendResult: "default",
      mailSendResult: "default",
      nicknameSendResult: false,
      countries: [],
      userInfo: [],
      fileInfo: [],
      countryList: CountryList,
      countryListName: [],
      bankList: BankList,
      bankListName: [],
      myNumberCardPicture1: [],
      myNumberCardPicture2: [],
      identityPhoto1: [],
      identityPhoto2: [],
      identityVerificationDocuments1: [],
      identityVerificationDocuments2: [],
      identityVerificationDocuments3: [],
      myNumberCardPicture1FormData: new FormData(),
      myNumberCardPicture2FormData: new FormData(),
      identityPhoto1FormData: new FormData(),
      identityPhoto2FormData: new FormData(),
      identityVerificationDocuments1FormData: new FormData(),
      identityVerificationDocuments2FormData: new FormData(),
      identityVerificationDocuments3FormData: new FormData(),
      myNumberCardPicture1Image: [],
      myNumberCardPicture2Image: [],
      identityPhoto1Image: [],
      identityPhoto2Image: [],
      identityVerificationDocuments1Image: [],
      identityVerificationDocuments2Image: [],
      identityVerificationDocuments3Image: [],
      addressInfo: {},
      completeModal: false,
      changeNicknameModal: false,
      changeMailModal: false,
      changePasswordModal: false,
      userSeiKanji: "",
      userMeiKanji: "",
      userSeiKana: "",
      userMeiKana: "",
      userGender: "",
      userGenderConfirm: "",
      userCountry: "",
      userMobilePhoneNumber: "",
      userBirthday: "",
      userBirthdayYMD: "",
      userPostalCode: "",
      userPrefectures: "",
      userAddress1: "",
      userAddress2: "",
      userBankName: "",
      userBranchBankName: "",
      userBranchBankNumber: "",
      userBankAccountType: "",
      userBankAccountTypeConfirm: "",
      userBankAccountNumber: "",
      userBankAccountHolderKana: "",
      approvedFlag: false,
      mailMagazine: false,
      checkedAgreements: [],
      selectedInvestmentExperience: [],
      selectedInvestmentPurpose: "",
      selectedInvestmentPeriod: "",
      selectedIncomeForm: "",
      selectedAnnualIncome: "",
      selectedFinancialAssets: "",
      selectedPlannedInvestmentAmount: "",
      userDBMapping: {
        男性: "a9b8e4d5-7597-42c5-9253-449d18f8debc",
        女性: "4da9cad5-cb58-4f8d-8585-6bf216b206e4",
        普通: "3e409316-0591-4a43-a5a8-4ce9f0203e7f",
        当座: "b01a89fc-4017-42c6-8c7f-f3ebd1bc6084"
      },
      stepControl: {
        fromBid: false,
        step: {
          step0: {
            editable: true,
            complete: false
          },
          step1: {
            editable: true,
            complete: false,
            item: [
              "苗字",
              "名前",
              "苗字（カタカナ）",
              "名前（カタカナ）",
              "性別",
              "国籍",
              "携帯番号",
              "郵便番号",
              "都道府県",
              "住所1"
            ]
          },
          step2: {
            editable: true,
            complete: false,
            item: [
              "銀行",
              "支店名",
              "支店番号",
              "口座種類",
              "口座番号",
              "名義人"
            ]
          },
          step3: {
            editable: true,
            complete: false,
            item: [
              "投資経験",
              "投資目的",
              "投資期間",
              "現在の収入形態",
              "現在の年収",
              "現在の金融資産",
              "運用予定額"
            ]
          },
          step4: {
            editable: true,
            complete: false,
            item: ["本人確認書類写真_1", "マイナンバーカード写真_1"]
          },
          step5: {
            editable: false,
            complete: false
          }
        }
      },
      incomeValueRules: [
        v => !!v || "入力してください",
        v => (v && v >= 500000) || "50万円以上で入力してください",
        v => (v && v < 1000000) || "100万円未満で入力してください"
      ],
      video: {},
      canvas: {},
      captures: [],
      photoModal: false,
      currentPhotoType: 1,
      photoTitle: {
        1: "顔の正面を撮影してください",
        2: "横顔を撮影してください",
        3: "本人確認書類の表面を撮影してください",
        4: "本人確認書類を斜めに向けて撮影してください",
        5: "本人確認書類の裏面を撮影してください",
        6: "マイナンバーカードの表面を撮影してください",
        7: "マイナンバーカードの裏面を撮影してください"
      },
      photoFlow: 1,
      curStream: null
    };
  },
  computed: {
    passwordChangeDisable() {
      return this.confirmPassword && this.newPassword && this.oldPassword
        ? false
        : true;
    },
    mailAddressChangeDisable() {
      return this.newEmail && this.reNewEmail ? false : true;
    },
    userNameJudgment() {
      return this.userBankAccountHolderKana.replace(/\s+/g, "") ==
        (this.userSeiKana + this.userMeiKana).replace(/\s+/g, "")
        ? false
        : true;
    },
    nicknameChangeDisable() {
      return this.newNickname ? false : true;
    }
  },
  created: async function() {},
  mounted: async function() {
    if (this.fromBid) {
      this.stepControl.fromBid = this.fromBid;
    }
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      this.userInfo = await this.getUserInfo();
      if (this.userInfo && this.userInfo.length > 0) {
        this.currentNickname = this.userInfo[0].ユーザ名
          ? this.userInfo[0].ユーザ名
          : "";
        this.userSeiKanji = this.userInfo[0].苗字 ? this.userInfo[0].苗字 : "";
        this.userMeiKanji = this.userInfo[0].名前 ? this.userInfo[0].名前 : "";
        this.userSeiKana = this.userInfo[0]["苗字（カタカナ）"]
          ? this.userInfo[0]["苗字（カタカナ）"]
          : "";
        this.userMeiKana = this.userInfo[0]["名前（カタカナ）"]
          ? this.userInfo[0]["名前（カタカナ）"]
          : "";
        this.userGender = this.userInfo[0].性別
          ? this.userDBMapping[this.userInfo[0].性別]
          : "a9b8e4d5-7597-42c5-9253-449d18f8debc";
        this.userGenderConfirm = this.userInfo[0].性別
          ? this.userInfo[0].性別
          : "男性";
        this.userCountry = this.userInfo[0].国籍 ? this.userInfo[0].国籍 : "";
        this.userMobilePhoneNumber = this.userInfo[0].携帯番号
          ? this.userInfo[0].携帯番号
          : "";
        this.userBirthday = this.userInfo[0].生年月日
          ? moment(this.userInfo[0].生年月日)
          : "";
        this.userBirthdayYMD = this.userInfo[0].生年月日
          ? moment(this.userInfo[0].生年月日).format("YYYY-MM-DD")
          : "";
        this.userPostalCode = this.userInfo[0].郵便番号
          ? this.userInfo[0].郵便番号
          : "";
        this.userPrefectures = this.userInfo[0].都道府県
          ? this.userInfo[0].都道府県
          : "";
        this.userAddress1 = this.userInfo[0].住所1
          ? this.userInfo[0].住所1
          : "";
        this.userAddress2 = this.userInfo[0].住所2
          ? this.userInfo[0].住所2
          : "";
        this.$set(
          this.addressInfo,
          "zip1",
          this.userInfo[0].郵便番号
            ? this.userInfo[0].郵便番号.split("-")[0]
            : ""
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
        this.userBankName = this.userInfo[0].銀行 ? this.userInfo[0].銀行 : "";
        this.userBranchBankName = this.userInfo[0].支店名
          ? this.userInfo[0].支店名
          : "";
        this.userBranchBankNumber = this.userInfo[0].支店番号
          ? this.userInfo[0].支店番号
          : "";
        this.userBankAccountType = this.userInfo[0].口座種類
          ? this.userDBMapping[this.userInfo[0].口座種類]
          : "3e409316-0591-4a43-a5a8-4ce9f0203e7f";
        this.userBankAccountTypeConfirm = this.userInfo[0].口座種類
          ? this.userInfo[0].口座種類
          : "普通";
        this.mailMagazine = this.userInfo[0].メールマガジン === "希望する";
        this.userBankAccountNumber = this.userInfo[0].口座番号
          ? this.userInfo[0].口座番号
          : "";
        this.userBankAccountHolderKana = this.userInfo[0].名義人
          ? this.userInfo[0].名義人
          : "";
        this.selectedInvestmentExperience = this.userInfo[0].投資経験
          ? this.userInfo[0].投資経験.split(",")
          : [];
        this.selectedInvestmentPurpose = this.userInfo[0].投資目的_投資方針
          ? this.userInfo[0].投資目的_投資方針
          : "利子・配当等安定収益重視";
        this.selectedInvestmentPeriod = this.userInfo[0].投資目的_投資期間
          ? this.userInfo[0].投資目的_投資期間
          : "長期運用";
        this.selectedIncomeForm = this.userInfo[0].現在の収入形態
          ? this.userInfo[0].現在の収入形態
          : "給与収入";
        // if (this.userInfo[0].現在の年収 === "百万円未満") {
        //   this.selectedAnnualIncome = "百万円未満";
        //   this.incomeValue = this.userInfo[0].現在の年収;
        // } else {
        //   this.selectedAnnualIncome = this.userInfo[0].現在の年収;
        // }
        this.selectedAnnualIncome = this.userInfo[0].現在の年収
          ? isNaN(this.userInfo[0].現在の年収)
            ? this.userInfo[0].現在の年収
            : "百万円未満"
          : "百万円～２百万円未満";
        if (!isNaN(this.userInfo[0].現在の年収)) {
          this.incomeValue = this.userInfo[0].現在の年収;
        }
        this.selectedFinancialAssets = this.userInfo[0].現在の金融資産
          ? this.userInfo[0].現在の金融資産
          : "百万円未満";
        this.selectedPlannedInvestmentAmount = this.userInfo[0].運用予定額
          ? this.userInfo[0].運用予定額
          : "百万円未満";

        this.myNumberCardPicture1 = await this.getFileInfo(
          "マイナンバーカード写真_1",
          this.userInfo[0].i_id
        );
        this.myNumberCardPicture2 = await this.getFileInfo(
          "マイナンバーカード写真_2",
          this.userInfo[0].i_id
        );
        this.identityPhoto1 = await this.getFileInfo(
          "本人顔写真_1",
          this.userInfo[0].i_id
        );
        this.identityPhoto2 = await this.getFileInfo(
          "本人顔写真_2",
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
        this.identityVerificationDocuments3 = await this.getFileInfo(
          "本人確認書類写真_3",
          this.userInfo[0].i_id
        );
      }
      for (const countryId in this.countryList) {
        this.countryListName.push(this.countryList[countryId].name);
      }
      for (const bankId in this.bankList) {
        this.bankListName.push(this.bankList[bankId].name);
      }

      // Stepタブ表示調整
      this.setStepControl(
        1,
        !this.stepControl.fromBid,
        this.isStepCompleted(1)
      );
      this.setStepControl(
        2,
        !this.stepControl.fromBid,
        this.isStepCompleted(2)
      );
      this.setStepControl(
        3,
        !this.stepControl.fromBid,
        this.isStepCompleted(3)
      );
      this.setStepControl(
        4,
        !this.stepControl.fromBid,
        this.isStepCompleted(4)
      );

      // const defaultConfig = {
      //   headers: {
      //     "Access-Control-Allow-Credentials": true,
      //     "Access-Control-Allow-Headers": "*",
      //     "Access-Control-Allow-Methods":
      //       "GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Expose-Headers": "*",
      //     "cache-control": "private",
      //     "content-type": "text/plain;charset=utf-8"
      //   }
      // };
      // let config = JSON.parse(JSON.stringify(defaultConfig));
      // const result = await axios.get(
      //   `//zipcloud.ibsnet.co.jp/api/search?zipcode=${this.userInfo[0].郵便番号}`,
      //   config
      // );
      // console.log(result);
    } catch (e) {
      console.log(e);
      this.$store.commit("auth/stateInit");
      this.$store.commit("datas/stateInit");
      this.$store.commit("user/stateInit");
      this.$router.push("/signin");
    } finally {
      // loading overlay非表示
      this.$store.commit("common/setLoading", false);
      switch (this.userInfo[0].ステータス) {
        case "申請中":
          this.completeModal = true;
          this.stepControl.step.step5.complete = true;
          break;
        case "承認済み":
          this.approvedFlag = true;
          this.stepControl.step.step5.complete = true;
          break;
      }
    }
  },
  methods: {
    showErrors(errors) {
      let errorString = errors.join("\n");
      alert(errorString);
    },
    async moveStep(step) {
      console.log(step);
      let errorList = [];
      switch (String(this.step)) {
        case "1":
          if (
            this.userSeiKanji &&
            this.userMeiKanji &&
            this.userSeiKana &&
            this.userMeiKana &&
            this.userGender &&
            this.userCountry &&
            this.userMobilePhoneNumber &&
            this.userBirthday &&
            this.userPostalCode &&
            this.userPrefectures &&
            this.userAddress1
          ) {
            try {
              if (
                !this.userSeiKana.match(/^[ァ-ヶー]+$/) ||
                !this.userMeiKana.match(/^[ァ-ヶー]+$/)
              ) {
                errorList.push("カタカナで入力されていません。");
                // alert("カタカナで入力されていません");
                // return;
              }
              if (
                this.userMobilePhoneNumber.length !== 11 ||
                !this.userMobilePhoneNumber.match(/[0-9]/)
              ) {
                errorList.push(
                  "携帯番号はハイフン無し11桁で入力してください。"
                );
              }
              if (
                this.userPostalCode.split("-")[0].length != 3 ||
                this.userPostalCode.split("-")[1].length != 4
              ) {
                errorList.push("正しい郵便番号を入力してください。");
              }
              if (errorList.length > 0) {
                this.showErrors(errorList);
                return;
              }
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              const result = await this.updatedDataItem(
                window.env.table.VUE_APP_USERINFOTABLE_ID,
                this.userInfo[0].i_id,
                {
                  history: {
                    comment: "Step1更新"
                  },
                  changes: [
                    {
                      id: "苗字",
                      value: this.userSeiKanji
                    },
                    {
                      id: "名前",
                      value: this.userMeiKanji
                    },
                    {
                      id: "苗字（カタカナ）",
                      value: this.userSeiKana
                    },
                    {
                      id: "名前（カタカナ）",
                      value: this.userMeiKana
                    },
                    {
                      id: "性別",
                      value: this.userGender
                    },
                    {
                      id: "国籍",
                      value: this.userCountry
                    },
                    {
                      id: "携帯番号",
                      value: this.userMobilePhoneNumber
                    },
                    {
                      id: "生年月日",
                      value: this.userBirthday
                    },
                    {
                      id: "郵便番号",
                      value: this.userPostalCode
                    },
                    {
                      id: "都道府県",
                      value: this.userPrefectures
                    },
                    {
                      id: "住所1",
                      value: this.userAddress1
                    },
                    {
                      id: "住所2",
                      value: this.userAddress2
                    }
                  ],
                  use_display_id: true,
                  is_force_update: true
                }
              );
              this.setStepControl(1, true, true);
              this.setStepControl(
                2,
                true,
                this.stepControl.step.step2.complete
              );
              if (!this.approvedFlag) {
                this.step = step;
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
          } else {
            alert("必須項目が入力されていません。");
          }
          break;
        case "2":
          console.log(this.step);
          console.log(this.userBankName);
          console.log(this.userBranchBankName);
          console.log(this.userBranchBankNumber);
          console.log(this.userBankAccountType);
          console.log(this.userBankAccountNumber);
          console.log(this.userBankAccountHolderKana);
          if (
            this.userBankName &&
            this.userBranchBankName &&
            this.userBranchBankNumber &&
            this.userBankAccountType &&
            this.userBankAccountNumber &&
            this.userBankAccountHolderKana
          ) {
            try {
              if (
                !this.userBankAccountHolderKana
                  .replace(/\s+/g, "")
                  .match(/^[ァ-ヶー]+$/)
              ) {
                // alert("カタカナで入力されていません");
                // return;
                errorList.push("カタカナで入力されていません");
              }
              if (
                this.userBranchBankNumber.length > 3 ||
                !this.userBranchBankNumber.match(/[0-9]/)
              ) {
                errorList.push("支店番号は半角数字3桁以内で入力してください。");
              }
              if (
                this.userBankAccountNumber.length > 8 ||
                !this.userBankAccountNumber.match(/[0-9]/)
              ) {
                errorList.push("口座番号は半角数字8桁以内で入力してください。");
              }
              if (errorList.length > 0) {
                this.showErrors(errorList);
                return;
              }
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              const result = await this.updatedDataItem(
                window.env.table.VUE_APP_USERINFOTABLE_ID,
                this.userInfo[0].i_id,
                {
                  history: {
                    comment: "Step2更新"
                  },
                  changes: [
                    {
                      id: "銀行",
                      value: this.userBankName
                    },
                    {
                      id: "支店名",
                      value: this.userBranchBankName
                    },
                    {
                      id: "支店番号",
                      value: this.userBranchBankNumber
                    },
                    {
                      id: "口座種類",
                      value: this.userBankAccountType
                    },
                    {
                      id: "口座番号",
                      value: this.userBankAccountNumber
                    },
                    {
                      id: "名義人",
                      value: this.userBankAccountHolderKana
                    }
                  ],
                  use_display_id: true,
                  is_force_update: true
                }
              );
              this.setStepControl(2, true, true);
              this.setStepControl(
                3,
                true,
                this.stepControl.step.step3.complete
              );
              if (!this.approvedFlag) {
                this.step = step;
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
          } else {
            alert("必須項目が入力されていません。");
          }
          break;
        case "3":
          console.log(this.step);
          if (
            this.selectedInvestmentExperience.length > 0 &&
            this.selectedInvestmentPurpose &&
            this.selectedInvestmentPeriod &&
            this.selectedIncomeForm &&
            this.selectedAnnualIncome &&
            this.selectedFinancialAssets &&
            this.selectedPlannedInvestmentAmount
          ) {
            if (this.selectedIncomeForm === "なし") {
              alert("恐れ入りますが、収入の無い方はお取引が出来ません。");
              return;
            }
            let selectedAnnualIncomeValue;
            if (this.selectedAnnualIncome === "百万円未満") {
              if (this.incomeValue < 500000 || this.incomeValue >= 1000000) {
                alert("年収額は50万円以上、100万円未満でご入力ください。");
                return;
              }
              selectedAnnualIncomeValue = this.incomeValue;
            } else {
              selectedAnnualIncomeValue = this.selectedAnnualIncome;
            }
            try {
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              const result = await this.updatedDataItem(
                window.env.table.VUE_APP_USERINFOTABLE_ID,
                this.userInfo[0].i_id,
                {
                  history: {
                    comment: "Step3更新"
                  },
                  changes: [
                    {
                      id: "投資経験",
                      value: this.selectedInvestmentExperience
                    },
                    {
                      id: "投資目的_投資方針",
                      value: this.selectedInvestmentPurpose
                    },
                    {
                      id: "投資目的_投資期間",
                      value: this.selectedInvestmentPeriod
                    },
                    {
                      id: "現在の収入形態",
                      value: this.selectedIncomeForm
                    },
                    {
                      id: "現在の年収",
                      value: selectedAnnualIncomeValue
                      // value: this.selectedAnnualIncome
                    },
                    {
                      id: "現在の金融資産",
                      value: this.selectedFinancialAssets
                    },
                    {
                      id: "運用予定額",
                      value: this.selectedPlannedInvestmentAmount
                    }
                  ],
                  use_display_id: true,
                  is_force_update: true
                }
              );
              this.setStepControl(3, true, true);
              this.setStepControl(
                4,
                true,
                this.stepControl.step.step4.complete
              );
              if (!this.approvedFlag) {
                this.step = step;
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
              // this.video = this.$refs.video;
              // if (
              //   navigator.mediaDevices &&
              //   navigator.mediaDevices.getUserMedia
              // ) {
              //   navigator.mediaDevices
              //     .getUserMedia({ video: true })
              //     .then(stream => {
              //       this.video.srcObject = stream;
              //       this.video.play();
              //     });
              // }
            }
          } else {
            alert("必須項目が入力されていません。");
          }
          break;
        case "4":
          console.log(this.step);
          if (
            (this.myNumberCardPicture1 ||
              this.myNumberCardPicture1FormData.get("file")) &&
            // (this.myNumberCardPicture2 ||
            //   this.myNumberCardPicture2FormData.get("file")) &&
            (this.identityVerificationDocuments1 ||
              this.identityVerificationDocuments1FormData.get("file")) &&
            // (this.identityVerificationDocuments2 ||
            //   this.identityVerificationDocuments2FormData.get("file"))
            (this.identityPhoto1 || this.identityPhoto1FormData.get("file")) &&
            (this.identityPhoto2 || this.identityPhoto2FormData.get("file"))
          ) {
            this.fileInfo.push(
              this.myNumberCardPicture1FormData,
              this.myNumberCardPicture2FormData,
              this.identityVerificationDocuments1FormData,
              this.identityVerificationDocuments2FormData,
              this.identityVerificationDocuments3FormData,
              this.identityPhoto1FormData,
              this.identityPhoto2FormData
            );
            try {
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              let attachmentList = [];
              for (const fileInfoKey in this.fileInfo) {
                if (!this.fileInfo[fileInfoKey].get("file")) {
                  attachmentList.push("none");
                  continue;
                }
                let fieldId = this.fileInfo[fileInfoKey].get("id");
                // 対象レコードにファイルをアップロード
                let formData = new FormData();
                formData.append("file", this.fileInfo[fileInfoKey].get("file"));
                formData.append(
                  "filename",
                  this.fileInfo[fileInfoKey].get("filename")
                );
                formData.append("application_id", this.applicationId);
                formData.append(
                  "datastore_id",
                  window.env.table.VUE_APP_USERINFOTABLE_ID
                );

                const uploadResult = await this.$hexalink.uploadFile(
                  this.token,
                  this.userInfo[0].i_id,
                  fieldId,
                  formData
                );

                attachmentList.push(uploadResult.data.file_id);

                let changes = [];
                console.log(attachmentList[fileInfoKey]);
                changes.push({
                  id: this.fields["ユーザマスタ"][fieldId],
                  value: [attachmentList[fileInfoKey]]
                });

                // カラムに登録
                if (changes.length > 0) {
                  // 添付ファイルの登録処理
                  const actionList = await this.$hexalink.getActionList(
                    this.token,
                    window.env.table.VUE_APP_USERINFOTABLE_ID,
                    this.userInfo[0].i_id
                  );

                  let actionId = actionList.filter(action => {
                    return action["action_name"] == "内容を更新する";
                  })[0].action_id;

                  let params = JSON.stringify({
                    is_force_update: true,
                    history: {
                      datastore_id: window.env.table.VUE_APP_USERINFOTABLE_ID,
                      comment: "添付ファイルの登録"
                    },
                    changes: changes
                  });
                  const actionResult = await this.$hexalink.execAction(
                    this.token,
                    this.userInfo[0].i_id,
                    actionId,
                    params
                  );
                }
              }
              this.setStepControl(4, true, true);
              this.setStepControl(
                5,
                true,
                this.stepControl.step.step5.complete
              );
              if (!this.approvedFlag) {
                this.step = step;
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
          } else {
            alert("必須項目が入力されていません。");
          }
          break;
        default:
          console.log(this.step);
          break;
      }
      window.scrollTo({
        top: 190,
        behavior: "smooth"
      });
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
    async getFileInfo(fileField, itemId) {
      const itemInfo = await this.$hexalink.getItem(
        this.token,
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_USERINFOTABLE_ID,
        itemId
      );
      const fileBinary = this.userInfo[0][fileField];
      if (fileBinary) {
        const ab = await this.$hexalink.getFile(this.token, fileBinary);
        const blob = new Blob([ab], { type: "image/jpeg" });
        switch (fileField) {
          case "本人顔写真_1":
            this.identityPhoto1Image = window.URL.createObjectURL(blob);
            break;
          case "本人顔写真_2":
            this.identityPhoto2Image = window.URL.createObjectURL(blob);
            break;
          case "本人確認書類写真_1":
            this.identityVerificationDocuments1Image = window.URL.createObjectURL(
              blob
            );
            break;
          case "本人確認書類写真_2":
            this.identityVerificationDocuments2Image = window.URL.createObjectURL(
              blob
            );
            break;
          case "本人確認書類写真_3":
            this.identityVerificationDocuments3Image = window.URL.createObjectURL(
              blob
            );
            break;
          case "マイナンバーカード写真_1":
            this.myNumberCardPicture1Image = window.URL.createObjectURL(blob);
            break;
          case "マイナンバーカード写真_2":
            this.myNumberCardPicture2Image = window.URL.createObjectURL(blob);
            break;
        }
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
    },
    async applyMember() {
      try {
        // loading overlay表示
        this.$store.commit("common/setLoading", true);
        const result = await this.updatedDataItem(
          window.env.table.VUE_APP_USERINFOTABLE_ID,
          this.userInfo[0].i_id,
          {
            history: {
              comment: "会員情報申請"
            },
            changes: [
              {
                id: "ステータス",
                value: "4a1bdb55-1f3b-4aa2-87d2-d9a2c87e1e76"
              }
            ],
            use_display_id: true,
            is_force_update: true
          }
        );
      } catch (e) {
        console.log(e);
      } finally {
        // loading overlay非表示
        this.$store.commit("common/setLoading", false);
        this.$router.push("/");
      }
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
    async setNickname() {
      try {
        // loading overlay表示
        this.$store.commit("common/setLoading", true);
        if (!this.newNickname) {
          this.errorMess = "ユーザ名が入力されていません";
          return;
        }
        if (this.newNickname.length > 10) {
          this.errorMess = "ユーザ名は10文字以内で入力してください";
          return;
        }
        const result = await this.updatedDataItem(
          window.env.table.VUE_APP_USERINFOTABLE_ID,
          this.userInfo[0].i_id,
          {
            history: {
              comment: "ニックネーム変更"
            },
            changes: [
              {
                id: "ユーザ名",
                value: this.newNickname
              }
            ],
            use_display_id: true,
            is_force_update: true
          }
        );
        this.nicknameSendResult = true;
        this.currentNickname = this.newNickname;
        this.$store.commit("auth/setUserNameKanji", this.newNickname);
        this.errorMess = "";
      } catch (e) {
        this.nicknameSendResult = false;
        console.log(e);
      } finally {
        // loading overlay非表示
        this.$store.commit("common/setLoading", false);
      }
    },
    async setPassword() {
      if (!this.newPassword) {
        this.errorMess = "パスワードが入力されていません";
        return;
      }
      if (
        !(
          this.newPassword.match(/[A-Za-z]/g) &&
          this.newPassword.match(/[0-9]/g)
        ) ||
        !this.newPassword.match(/^[A-Za-z0-9]*$/) ||
        this.newPassword.length < 8 ||
        this.newPassword.length > 20
      ) {
        this.errorMess =
          "パスワードは8~20文字の半角英数の組み合わせで入力してください";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errorMess = "確認用パスワードが一致していません";
        return;
      }
      const params = JSON.stringify({
        confirm_password: this.confirmPassword,
        new_password: this.newPassword,
        old_password: this.oldPassword
      });
      const result = await this.$hexalink.setPassword(this.token, params);
      this.passwordSendResult = JSON.parse(result.request.response).error;
      if (this.passwordSendResult) {
        this.errorMess = "パスワードの変更に失敗しました";
      } else {
        this.errorMess = "";
      }
    },
    async setMailAddress() {
      if (
        this.newEmail.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        if (this.newEmail !== this.reNewEmail) {
          this.errorMess = "確認用メールアドレスが一致していません";
          return;
        }
        try {
          const params = JSON.stringify({
            email: this.newEmail,
            registration_domain: window.env.VUE_APP_BASEURL,
            registration_path: "updateemail"
          });
          const result = await this.$hexalink.setMailAddress(
            this.token,
            params
          );
          this.mailSendResult = JSON.parse(result.request.response).error;
          this.errorMess = "";
        } catch (e) {
          this.errorMess = "メールアドレス変更申請時にエラーが発生しました";
        }
      } else {
        this.errorMess = "メールアドレスを入力してください";
      }
    },
    async switchMailMagazine(e) {
      console.log(e);
      const result = await this.updatedDataItem(
        window.env.table.VUE_APP_USERINFOTABLE_ID,
        this.userInfo[0].i_id,
        {
          changes: [
            {
              id: "メールマガジン",
              value: e ? "希望する" : "希望しない"
            }
          ],
          use_display_id: true,
          is_force_update: true
        }
      );
    },
    closeModal() {
      this.confirmPassword = "";
      this.newPassword = "";
      this.oldPassword = "";
      this.errorMess = "";
      this.passwordSendResult = "default";
      this.changePasswordModal = false;
      this.mailSendResult = "default";
      this.changeMailModal = false;
      this.changeNicknameModal = false;
      this.photoModal = false;
    },
    emittedNameKanji(value) {
      console.log("漢字：", value);
      this.userSeiKanji = value.split("　")[0];
      this.userMeiKanji = value.split("　")[1];
      console.log(this.userSeiKanji, this.userMeiKanji);
    },
    emittedNameKana(value) {
      console.log("カナ：", value);
      this.userSeiKana = value.split(" ")[0];
      this.userMeiKana = value.split(" ")[1];
    },
    emittedGender(value) {
      console.log("性別：", value);
      this.userGender = value;
      this.userGenderConfirm = Object.keys(this.userDBMapping).filter(key => {
        return this.userDBMapping[key] === value;
      })[0];
    },
    emittedCountry(value) {
      console.log("国籍：", value);
      this.userCountry = value;
    },
    emittedMobilePhoneNumber(value) {
      console.log("電話番号：", value);
      this.userMobilePhoneNumber = value;
    },
    emittedBirthday(value) {
      console.log("生年月日：", moment(value));
      this.userBirthday = moment(value);
      this.userBirthdayYMD = moment(value).format("YYYY-MM-DD");
    },
    emittedAddress(value) {
      console.log("ご住所：", value);
      switch (value.name) {
        case "postalCode":
          this.userPostalCode = value.value;
          break;
        case "prefectures":
          this.addressInfo = Object.assign({}, this.addressInfo, {
            prefectures: value.value
          });
          this.userPrefectures = value.value;
          break;
        case "address1":
          this.addressInfo = Object.assign({}, this.addressInfo, {
            address1: value.value
          });
          this.userAddress1 = value.value;
          break;
        case "address2":
          this.userAddress2 = value.value;
          break;
      }
    },
    emittedBankName(value) {
      console.log("金融機関名：", value);
      this.userBankName = value;
    },
    emittedBranchBankName(value) {
      console.log("支店名：", value);
      this.userBranchBankName = value;
    },
    emittedBranchBankNumber(value) {
      console.log("支店番号：", value);
      this.userBranchBankNumber = value;
    },
    emittedBankAccountType(value) {
      console.log("口座種類：", value);
      this.userBankAccountType = value;
      this.userBankAccountTypeConfirm = Object.keys(this.userDBMapping).filter(
        key => {
          return this.userDBMapping[key] === value;
        }
      )[0];
    },
    emittedBankAccountNumber(value) {
      console.log("口座番号：", value);
      this.userBankAccountNumber = value;
    },
    emittedBankAccountHolderKana(value) {
      console.log("名義人（カタカナ）：", value);
      this.userBankAccountHolderKana = value;
    },
    emittedInvestmentExperience(value) {
      console.log("投資経験：", value);
      this.selectedInvestmentExperience = value;
    },
    emittedInvestmentPurpose(value) {
      console.log("投資目的：", value);
      this.selectedInvestmentPurpose = value;
    },
    emittedInvestmentPeriod(value) {
      console.log("投資期間：", value);
      this.selectedInvestmentPeriod = value;
    },
    emittedIncomeForm(value) {
      console.log("収入形態：", value);
      this.selectedIncomeForm = value;
    },
    emittedAnnualIncome(value) {
      console.log("年収：", value);
      this.selectedAnnualIncome = value;
    },
    emittedFinancialAssets(value) {
      console.log("金融資産：", value);
      this.selectedFinancialAssets = value;
    },
    emittedPlannedInvestmentAmount(value) {
      console.log("運用予定額：", value);
      this.selectedPlannedInvestmentAmount = value;
    },
    emittedFile(value) {
      console.log("ファイル種類", value.name);
      console.log(value.value.get("file"));
      switch (value.name) {
        case "本人確認書類写真_1":
          if (value.value.get("file")) {
            this.identityVerificationDocuments1FormData = value.value;
            this.createImage(value.value.get("file"), value.name);
          } else {
            this.identityVerificationDocuments1 = [];
            this.identityVerificationDocuments1Image = "";
          }
          break;
        case "本人確認書類写真_2":
          if (value.value.get("file")) {
            this.identityVerificationDocuments2FormData = value.value;
            this.createImage(value.value.get("file"), value.name);
          } else {
            this.identityVerificationDocuments2 = [];
            this.identityVerificationDocuments2Image = "";
          }
          break;
        case "マイナンバーカード写真_1":
          if (value.value.get("file")) {
            this.myNumberCardPicture1FormData = value.value;
            this.createImage(value.value.get("file"), value.name);
          } else {
            this.myNumberCardPicture1 = [];
            this.myNumberCardPicture1Image = "";
          }
          break;
        case "マイナンバーカード写真_2":
          if (value.value.get("file")) {
            this.myNumberCardPicture2FormData = value.value;
            this.createImage(value.value.get("file"), value.name);
          } else {
            this.myNumberCardPicture2 = [];
            this.myNumberCardPicture2Image = "";
          }
          break;
      }
    },
    // アップロードした画像を表示
    createImage(file, name) {
      const reader = new FileReader();
      reader.onload = e => {
        switch (name) {
          case "本人確認書類写真_1":
            this.identityVerificationDocuments1Image = e.target.result;
            break;
          case "本人確認書類写真_2":
            this.identityVerificationDocuments2Image = e.target.result;
            break;
          case "マイナンバーカード写真_1":
            this.myNumberCardPicture1Image = e.target.result;
            break;
          case "マイナンバーカード写真_2":
            this.myNumberCardPicture2Image = e.target.result;
            break;
        }
      };
      reader.readAsDataURL(file);
    },
    isStepCompleted(step) {
      let data = this.userInfo[0];
      let items = this.stepControl.step[`step${step}`].item;
      for (const item of items) {
        if (!data[item]) {
          return false;
        }
      }
      return true;
    },
    setStepControl(step, editable, complete) {
      this.stepControl.step[`step${step}`].editable = editable;
      this.stepControl.step[`step${step}`].complete = complete;
      this.setStep5editable();
    },
    setStep5editable() {
      if (this.stepControl.fromBid) {
        this.stepControl.step.step5.editable =
          this.stepControl.step.step1.complete &&
          this.stepControl.step.step2.complete &&
          this.stepControl.step.step3.complete &&
          this.stepControl.step.step4.complete;
      } else {
        this.stepControl.step.step5.editable =
          this.stepControl.step.step1.complete &&
          this.stepControl.step.step4.complete;
      }
    },
    checkDigits(event) {
      if (
        event.target.value.length > event.target.max - 1 &&
        event.keyCode !== 8 &&
        event.keyCode !== 46 &&
        event.keyCode !== 37 &&
        event.keyCode !== 39 &&
        event.keyCode !== 9
      ) {
        event.preventDefault();
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
    confirmCapture(flow) {
      this.photoFlow = flow;
      this.video = this.$refs.video;
      let constrains = { video: true };
      switch (this.currentPhotoType) {
        case 1:
        case 2:
          constrains = { video: { facingMode: "user" } };
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          constrains = { video: { facingMode: "environment" } };
          break;
      }
      // すでにカメラと接続していたら停止
      if (this.curStream !== null) {
        this.curStream.getVideoTracks().forEach(camera => {
          camera.stop();
        });
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constrains).then(stream => {
          this.curStream = stream;
          this.video.srcObject = stream;
          this.video.play();
        });
      } else {
        alert("カメラに非対応のブラウザです。ブラウザを変えてお試しください。");
      }
    },
    capture(flow) {
      this.photoFlow = flow;
      let formData = new FormData();
      this.canvas = this.$refs.canvas;
      this.canvas
        .getContext("2d")
        .drawImage(
          this.video,
          0,
          0,
          this.video.clientWidth,
          this.video.clientHeight
        );
      var base64 = this.canvas.toDataURL("image/png"),
        bin = atob(base64.replace(/^.*,/, "")),
        buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }
      var blob = new Blob([buffer], { type: "image/jpeg" });
      switch (this.currentPhotoType) {
        case 1:
          this.identityPhoto1Image = window.URL.createObjectURL(blob);
          formData.append("id", "本人顔写真_1");
          formData.append("file", blob);
          formData.append("filename", "本人顔写真正面.png");
          this.identityPhoto1FormData = formData;
          break;
        case 2:
          this.identityPhoto2Image = window.URL.createObjectURL(blob);
          formData.append("id", "本人顔写真_2");
          formData.append("file", blob);
          formData.append("filename", "本人顔写真横顔.png");
          this.identityPhoto2FormData = formData;
          break;
        case 3:
          this.identityVerificationDocuments1Image = window.URL.createObjectURL(
            blob
          );
          formData.append("id", "本人確認書類写真_1");
          formData.append("file", blob);
          formData.append("filename", "本人確認書類表面.png");
          this.identityVerificationDocuments1FormData = formData;
          break;
        case 4:
          this.identityVerificationDocuments3Image = window.URL.createObjectURL(
            blob
          );
          formData.append("id", "本人確認書類写真_3");
          formData.append("file", blob);
          formData.append("filename", "本人確認書類斜め.png");
          this.identityVerificationDocuments3FormData = formData;
          break;
        case 5:
          this.identityVerificationDocuments2Image = window.URL.createObjectURL(
            blob
          );
          formData.append("id", "本人確認書類写真_2");
          formData.append("file", blob);
          formData.append("filename", "本人確認書類裏面.png");
          this.identityVerificationDocuments2FormData = formData;
          break;
        case 6:
          this.myNumberCardPicture1Image = window.URL.createObjectURL(blob);
          formData.append("id", "マイナンバーカード写真_1");
          formData.append("file", blob);
          formData.append("filename", "マイナンバーカード写真表面.png");
          this.myNumberCardPicture1FormData = formData;
          break;
        case 7:
          this.myNumberCardPicture2Image = window.URL.createObjectURL(blob);
          formData.append("id", "マイナンバーカード写真_2");
          formData.append("file", blob);
          formData.append("filename", "マイナンバーカード写真裏面.png");
          this.myNumberCardPicture2FormData = formData;
          break;
      }
    },
    // スマートフォンかそれ以外かを判別する。
    isSmartPhone() {
      var media = [
        "iPhone",
        "iPad",
        "Android"
        /*その他、blackberry,windowsPhoneなど必要なものがあれば追加する*/
        /*Androidは'Android'という文字列だけで全てのAndroid端末を判別出来ないので注意*/
      ];
      var pattern = new RegExp(media.join("|"), "i");
      return pattern.test(navigator.userAgent);
    },
    openPhotoModal(type) {
      this.photoModal = true;
      this.photoFlow = 1;
      this.currentPhotoType = type;
    }
  }
};
</script>
