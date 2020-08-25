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
      :non-linear="!stepControl.fromBid"
      :alt-labels="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    >
      <div class="v-stepper__header_wrap">
        <v-stepper-header class="userInfo_nav">
          <v-stepper-step
            :editable="stepControl.step.step0.editable"
            :complete="stepControl.step.step0.complete"
            step="0"
            @click="step = 0"
          >
            アカウント/通知設定
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step1.editable"
            :complete="stepControl.step.step1.complete"
            step="1"
            @click="step = 1"
          >
            個人情報
            <span
              v-if="!stepControl.fromBid && !stepControl.step.step2.complete"
              class="mark-alert"
            ></span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step2.editable"
            :complete="stepControl.step.step2.complete"
            step="2"
            @click="step = 2"
          >
            口座情報
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step3.editable"
            :complete="stepControl.step.step3.complete"
            step="3"
            @click="step = 3"
          >
            投資について
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step4.editable"
            :complete="stepControl.step.step4.complete"
            step="4"
            @click="step = 4"
          >
            本人確認書類
            <span
              v-if="!stepControl.fromBid && !stepControl.step.step4.complete"
              class="mark-alert"
            ></span>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :editable="stepControl.step.step5.editable"
            :complete="stepControl.step.step5.complete"
            step="5"
            @click="step = 5"
          >
            {{ stepControl.fromBid ? "登録内容確認" : "登録申請" }}
            <span
              v-if="
                !stepControl.fromBid &&
                  stepControl.step.step2.complete &&
                  stepControl.step.step4.complete
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
                {{ email }}
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
                【ファイル形式】JPG、JPEG、GIF、BMP、PNG、TIF、TIFF、PDF（サイズ：3MB以下）
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
                  :required="true"
                  placeholder="例）0312345678 ※ハイフン無し11桁"
                  hint="※ハイフン無し11桁"
                  :value="
                    userInfo[0] && userInfo[0].携帯番号
                      ? userInfo[0].携帯番号
                      : ''
                  "
                  @input="emittedMobilePhoneNumber"
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
                />
                <FormAddress
                  title="ご住所"
                  :required="true"
                  :value="addressInfo"
                  @input="emittedAddress"
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
                  :required="true"
                  :value="
                    userInfo[0] && userInfo[0].支店番号
                      ? userInfo[0].支店番号
                      : ''
                  "
                  placeholder="例）123"
                  hint="半角数字"
                  @input="emittedBranchBankNumber"
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
                      : 'b01a89fc-4017-42c6-8c7f-f3ebd1bc6084'
                  "
                  @change="emittedBankAccountType"
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
                  @input="emittedBankAccountNumber"
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
                    { value: '国内株式', label: '国内株式' },
                    { value: '国内債券', label: '国内債券' },
                    { value: '外貨預金', label: '外貨預金' },
                    { value: '外国株式', label: '外国株式' },
                    { value: '外国債権', label: '外国債権' },
                    { value: '投資信託', label: '投資信託' },
                    { value: '先物・オプション', label: '先物・オプション' }
                  ]"
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
                />
                <FormRadio
                  title="現在の年収"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '５百万円未満', label: '５百万円未満' },
                    {
                      value: '５百万円未満～１千万円未満',
                      label: '５百万円未満～１千万円未満'
                    },
                    {
                      value: '１千万円未満～３千万円未満',
                      label: '１千万円未満～３千万円未満'
                    },
                    {
                      value: '３千万円未満～５千万円未満',
                      label: '３千万円未満～５千万円未満'
                    },
                    {
                      value: '５千万円未満～１億円未満',
                      label: '５千万円未満～１億円未満'
                    },
                    {
                      value: '１億円以上',
                      label: '１億円以上'
                    }
                  ]"
                />
                <FormRadio
                  title="現在の金融資産"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '５百万円未満', label: '５百万円未満' },
                    {
                      value: '５百万円未満～１千万円未満',
                      label: '５百万円未満～１千万円未満'
                    },
                    {
                      value: '１千万円未満～３千万円未満',
                      label: '１千万円未満～３千万円未満'
                    },
                    {
                      value: '３千万円未満～５千万円未満',
                      label: '３千万円未満～５千万円未満'
                    },
                    {
                      value: '５千万円未満～１億円未満',
                      label: '５千万円未満～１億円未満'
                    },
                    {
                      value: '１億円以上',
                      label: '１億円以上'
                    }
                  ]"
                />
                <FormRadio
                  title="運用予定額"
                  class="select-2column"
                  :required="true"
                  :radios="[
                    { value: '５百万円未満', label: '５百万円未満' },
                    {
                      value: '５百万円未満～１千万円未満',
                      label: '５百万円未満～１千万円未満'
                    },
                    {
                      value: '１千万円未満～３千万円未満',
                      label: '１千万円未満～３千万円未満'
                    },
                    {
                      value: '３千万円未満～５千万円未満',
                      label: '３千万円未満～５千万円未満'
                    },
                    {
                      value: '５千万円未満～１億円未満',
                      label: '５千万円未満～１億円未満'
                    },
                    {
                      value: '１億円以上',
                      label: '１億円以上'
                    }
                  ]"
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="step = 2">
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
                  【ファイル形式】JPG、JPEG、GIF、BMP、PNG、TIF、TIFF、PDF（サイズ：3MB以下）<br />
                  ※入力した住所と同一である必要があります。※運転免許証は裏面もご提出ください。
                </p>
              </div>
              <v-form class="entryForm">
                <FormFile
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
                />
                <div class="entryForm_footer">
                  <v-btn class="button-cancel" @click="step = 3">
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
                      {{ userPostalCode }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title"></div>
                    <div class="formConfirm_item_body">
                      {{ userPrefectures }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title"></div>
                    <div class="formConfirm_item_body">
                      {{ userAddress1 }}
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title"></div>
                    <div class="formConfirm_item_body">
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
                  <div class="formConfirm_item">
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
                </div>
                <div class="formConfirm_bottom">
                  <v-btn class="button-secondary" @click="step = 2">
                    Step2を修正する
                  </v-btn>
                </div>
              </section>
              <section class="formConfirm">
                <h4 class="formConfirm_title">Step.4&nbsp;本人確認書類</h4>
                <div class="formConfirm_item_wrapper">
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人確認書類写真1
                    </div>
                    <div class="formConfirm_item_body">
                      <img :src="identityVerificationDocuments1Image" />
                    </div>
                  </div>
                  <div class="formConfirm_item">
                    <div class="formConfirm_item_title">
                      本人確認書類写真2
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
                <v-checkbox
                  v-model="checkedAgreements"
                  label="利用規約に同意"
                  value="1"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="個人情報の処理方針に同意"
                  value="2"
                  required
                />
                <v-checkbox
                  v-model="checkedAgreements"
                  label="個人情報の収集および利用に同意"
                  value="3"
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
                <v-checkbox
                  v-model="checkedAgreements"
                  label="全てに同意する"
                  value="4"
                  required
                />
                <div class="entryForm_footer">
                  <button
                    class="button-action"
                    :disabled="checkedAgreements.length !== 4"
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
        class="modal-bid"
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
            <div class="currentData_body">
              {{ email }}
            </div>
          </div>
          <FormTextfield
            v-model="newEmail"
            title="新しいメールアドレス"
            :required="true"
          />
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
        @close="closeModal"
      >
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
          />
          <FormPassfield
            v-model="confirmPassword"
            title="新しいパスワード（確認）"
            :required="true"
          />
        </v-form>
        <div v-if="!passwordSendResult" class="modalForm_complete">
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          <p class="modalForm_complete_text">
            パスワードを変更しました。
          </p>
        </div>
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
import moment from "moment";

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
      fields: this.$store.getters["datas/getFields"],
      userId: this.$store.getters["user/getMembershipNumber"],
      step: 1,
      errorMess: "",
      email: this.$store.getters["user/getEmail"],
      newEmail: "",
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
      passwordSendResult: "default",
      countries: [],
      userInfo: [],
      fileInfo: [],
      countryList: CountryList,
      countryListName: [],
      bankList: BankList,
      bankListName: [],
      myNumberCardPicture1: [],
      myNumberCardPicture2: [],
      identityVerificationDocuments1: [],
      identityVerificationDocuments2: [],
      myNumberCardPicture1FormData: new FormData(),
      myNumberCardPicture2FormData: new FormData(),
      identityVerificationDocuments1FormData: new FormData(),
      identityVerificationDocuments2FormData: new FormData(),
      myNumberCardPicture1Image: [],
      myNumberCardPicture2Image: [],
      identityVerificationDocuments1Image: [],
      identityVerificationDocuments2Image: [],
      addressInfo: {},
      completeModal: false,
      cahangeMailModal: false,
      cahangePasswordModal: false,
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
      checkedAgreements: [],
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
            complete: false
          },
          step2: {
            editable: true,
            complete: false
          },
          step3: {
            editable: true,
            complete: false
          },
          step4: {
            editable: true,
            complete: false
          },
          step5: {
            editable: false,
            complete: false
          }
        }
      }
    };
  },
  computed: {
    passwordChangeDisable() {
      return this.confirmPassword && this.newPassword && this.oldPassword
        ? false
        : true;
    }
  },
  created: async function() {},
  mounted: async function() {
    try {
      // loading overlay表示
      this.$store.commit("common/setLoading", true);
      this.userInfo = await this.getUserInfo();
      if (this.userInfo && this.userInfo.length > 0) {
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
        console.log(this.userBankAccountType);
        this.userBankAccountNumber = this.userInfo[0].口座番号
          ? this.userInfo[0].口座番号
          : "";
        this.userBankAccountHolderKana = this.userInfo[0].名義人
          ? this.userInfo[0].名義人
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
      }
      for (const countryId in this.countryList) {
        this.countryListName.push(this.countryList[countryId].name);
      }
      for (const bankId in this.bankList) {
        this.bankListName.push(this.bankList[bankId].name);
      }
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
    } finally {
      // loading overlay非表示
      this.$store.commit("common/setLoading", false);
      switch (this.userInfo[0].ステータス) {
        case "申請中":
          this.completeModal = true;
          break;
        case "承認済み":
          this.approvedFlag = true;
          break;
      }
    }
  },
  methods: {
    async moveStep(step) {
      console.log(step);
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
            this.userAddress1 &&
            this.userAddress2
          ) {
            try {
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              const result = await this.updatedDataItem(
                this.datastoreIds["ユーザDB"],
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
            } catch (e) {
              console.log(e);
            } finally {
              this.step = step;
              console.log(this.step);
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
              // loading overlay表示
              this.$store.commit("common/setLoading", true);
              const result = await this.updatedDataItem(
                this.datastoreIds["ユーザDB"],
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
            } catch (e) {
              console.log(e);
            } finally {
              this.step = step;
              // loading overlay非表示
              this.$store.commit("common/setLoading", false);
            }
          } else {
            alert("必須項目が入力されていません。");
          }
          break;
        case "3":
          console.log(this.step);
          this.step = step;
          break;
        case "4":
          console.log(this.step);
          if (
            (this.myNumberCardPicture1.length > 0 ||
              this.myNumberCardPicture1FormData.get("file")) &&
            // (this.myNumberCardPicture2.length > 0 ||
            //   this.myNumberCardPicture2FormData.get("file")) &&
            (this.identityVerificationDocuments1.length > 0 ||
              this.identityVerificationDocuments1FormData.get("file")) //&&
            // (this.identityVerificationDocuments2.length > 0 ||
            //   this.identityVerificationDocuments2FormData.get("file"))
          ) {
            this.fileInfo.push(
              this.myNumberCardPicture1FormData,
              this.myNumberCardPicture2FormData,
              this.identityVerificationDocuments1FormData,
              this.identityVerificationDocuments2FormData
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
                formData.append("datastore_id", this.datastoreIds["ユーザDB"]);

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
                  id: this.fields["ユーザDB"][fieldId],
                  value: [attachmentList[fileInfoKey]]
                });

                // カラムに登録
                if (changes.length > 0) {
                  // 添付ファイルの登録処理
                  const actionList = await this.$hexalink.getActionList(
                    this.token,
                    this.datastoreIds["ユーザDB"],
                    this.userInfo[0].i_id
                  );

                  let actionId = actionList.filter(action => {
                    return action["action_name"] == "内容を更新する";
                  })[0].action_id;

                  let params = JSON.stringify({
                    is_force_update: true,
                    history: {
                      datastore_id: this.datastoreIds["ユーザDB"],
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
            } catch (e) {
              console.log(e);
            } finally {
              this.step = step;
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
        const blob = new Blob([ab], { type: "image/jpeg" });
        switch (fileField) {
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
          this.datastoreIds["ユーザDB"],
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
    async setPassword() {
      let params = JSON.stringify({
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
    closeModal() {
      console.log("test");
      this.confirmPassword = "";
      this.newPassword = "";
      this.oldPassword = "";
      this.errorMess = "";
      this.passwordSendResult = "default";
      this.cahangePasswordModal = false;
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
    }
  }
};
</script>
