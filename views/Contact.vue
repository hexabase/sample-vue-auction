<template>
  <div id="page_contact" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">お問い合わせ</h2>
        </div>
      </div>
    </header>
    <section class="contactForm">
      <div class="content">
        <h3 class="contactForm_title">
          <span v-if="step === 1">お問い合わせ内容の入力</span>
          <span v-if="step === 2">お問い合わせ内容の確認</span>
          <span v-if="step === 3">お問い合わせ 送信完了</span>
        </h3>
        <p class="contactForm_text">
          <span v-if="step === 1">
            BATONへのお問い合わせは、以下のフォームより送信してください。<br />
            ご不明な点につきましては、
            <router-link to="qa">Q&amp;A</router-link>もご覧ください。
          </span>
          <span v-if="step === 2">以下の内容で送信してよろしいですか。</span>
          <span v-if="step === 3">
            お問い合わせありがとうございました。<br />
            <router-link to="/">HOMEへ</router-link>
          </span>
        </p>
        <v-form
          v-if="step != 3"
          :class="{
            entryForm: true,
            'entryForm-confirm': step === 2
          }"
        >
          <div v-if="errorMess != ''" class="error_msg">
            <v-alert text color="red">
              {{ errorMess }}
            </v-alert>
          </div>
          <ValidationObserver ref="contact" v-slot="{}">
            <FormTextfieldName
              title="お名前"
              :required="true"
              :editable="isEditable()"
              valrule="required"
              :userinfo="userInfo"
            />
            <FormTextfield
              title="メールアドレス"
              :required="true"
              :editable="isEditable()"
              valrule="required|email"
              :value="setUserInfo('mail')"
            />
            <FormTextfield
              title="タイトル"
              :required="true"
              :counter="100"
              :editable="isEditable()"
              hint="100文字以内"
              valrule="required|doubleCount:100"
            />
            <FormTextarea
              title="お問い合わせ内容"
              :required="true"
              hint="500文字以内"
              :counter="500"
              valrule="required|doubleCount:500"
              :editable="isEditable()"
            />
            <div class="entryForm_footer">
              <v-btn
                v-if="step === 2"
                class="button-cancel"
                :disabled="false"
                @click="step = 1"
              >
                <v-icon>mdi-chevron-left</v-icon>
                戻る
              </v-btn>
              <v-btn
                v-if="step === 1"
                class="button-action"
                @click="moveConfirmPage"
              >
                送信内容を確認する
              </v-btn>
              <v-btn
                v-if="step === 2"
                class="button-action"
                :disabled="false"
                @click="applyContact"
              >
                送信する
              </v-btn>
            </div>
          </ValidationObserver>
        </v-form>
      </div>
    </section>
  </div>
</template>
<script>
import FormTextarea from "@/components/parts/form/FormTextarea.vue";
import FormTextfield from "@/components/parts/form/FormTextfield.vue";
import FormTextfieldName from "@/components/parts/form/FormTextfieldName.vue";
export default {
  components: {
    FormTextarea,
    FormTextfield,
    FormTextfieldName
  },
  data() {
    return {
      step: 1,
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      errorMess: "",
      userInfo: []
    };
  },
  created: async function() {},
  mounted: async function() {
    this.userInfo = await this.getUserInfo();
  },
  methods: {
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
    setUserInfo(type) {
      if (this.userInfo) {
        return this.userInfo[0].Email;
      }
    },
    isEditable() {
      return this.step === 1 ? true : false;
    },
    // handleBlur(value) {
    //   console.log(value, this, this.$refs.contact);
    //   this.$refs.contact.validate().then(result => {
    //     console.log("submit", result);
    //   });
    // },
    moveConfirmPage() {
      this.errorMess = "";
      this.$refs.contact.validate().then(result => {
        this.step = result ? 2 : 1;
        if (!result) {
          this.errorMess =
            "送信内容に不備がございます。入力内容をご確認ください。";
        }
      });
      window.scrollTo({
        top: 190,
        behavior: "smooth"
      });
    },
    applyContact() {
      // メール送信処理の実装よろしくお願いします
      this.step = 3;
      window.scrollTo({
        top: 190,
        behavior: "smooth"
      });
    }
  }
};
</script>
