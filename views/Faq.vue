<template>
  <div id="page_faq" data-role="page">
    <header class="pageHeader">
      <div class="pageHeader_img">
        <div class="content">
          <h2 class="pageHeader_title">よくあるご質問</h2>
        </div>
      </div>
      <!-- <v-tabs v-model="tab" hide-slider class="tabMenu">
        <v-tab href="#tab-user" class="tabMenu_tabItem">
          ユーザー向けQ&amp;A
        </v-tab>
        <v-tab href="#tab-artist" class="tabMenu_tabItem">
          アーティスト向けQ&amp;A
        </v-tab>
      </v-tabs> -->
    </header>
    <section class="faq">
      <div class="content">
        <!-- <v-tabs-items v-model="tab">
          <v-tab-item value="tab-user">
            <h3 class="faq_title">
              ユーザー向けQ&amp;A
            </h3>
            <div class="faq_list">
              <article class="faq_item">
                <input id="faq1" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq1">
                      アプリはございますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      現在はブラウザ版のみとなっていますが、今後はアプリも開発する予定です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq2" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq2">
                      口座開設に制限はありますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      非日本居住者または、20歳未満もしく満80歳以上のお客様には、口座開設をお断りさせていただきます。<br />
                      予めご了承ください。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq3" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq3">
                      口座開設にかかる日数を教えてください。
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      必要書類の提出後に不備が無ければ、最長5営業日となります。<br />
                      ただし、システムメンテナンス等の事情により、それ以上かかる場合もございます。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq4" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq4">
                      口座開設する際に、管理費や年会費はかかりますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      全て無料です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq5" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq5">
                      メールマガジンを停止出来ますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      ログイン後に「ユーザー情報」→「アカウント/通知設定」にて設定できます。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq6" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq6">
                      落札後の流れを教えてください。
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      オークション完了後、落札者に落札通知および入金用の振込口座を記載したメールを送信致します。<br />
                      メールに記載する締切日までに指定振込口座に必要金額を振り込んで頂きます。<br />
                      入金が確認されましたら、出品者から商品が発送されます。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq7" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq7">
                      口座名義と本人名義が違っている場合、入出金は可能ですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      いいえ。「犯罪による収益の移転防止に関する法律（犯罪収益移転防止法）」により、ご本人様による入金・出金であるか否かの確認が求められているため、入金・出金は取引口座のご本人様名義でのみ可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq8" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq8">
                      分配金は確定申告の対象になりますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      分配金は課税対象になりますので、確定申告を行ってください。
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </v-tab-item>
          <v-tab-item value="tab-artist">
            <h3 class="faq_title">
              アーティスト向けQ&amp;A
            </h3>
            <div class="faq_list">
              <article class="faq_item">
                <input id="faq-a1" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a1">
                      どのような著作権をオークションに出品出来ますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      印税収入のある音楽著作権なら出品可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a2" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a2">
                      出品したい場合、誰に連絡すれば良いですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      お問い合わせ画面から、弊社に連絡してください。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a3" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a3">
                      作詞もしくは作曲だけの著作権でも出品出来ますか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      作詞だけでも作曲だけでも出品可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a4" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a4">
                      既に出版社と著作権契約書を締結していますが、出品可能ですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      はい、出品可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a5" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a5">
                      昔の楽曲でも出品可能ですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      はい、印税収入のある著作権なら出品可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a6" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a6">
                      著作権の一部だけ出品することは可能ですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      はい、一部でも全部でも可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a7" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a7">
                      新曲の著作権でも出品可能ですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      はい、出品可能です。
                    </p>
                  </div>
                </div>
              </article>
              <article class="faq_item">
                <input id="faq-a8" type="checkbox" class="faq_switch" />
                <div class="faq_content">
                  <h4 class="faq_question">
                    <label for="faq-a8">
                      オークション開始価格の設定はどうすればいいですか？
                    </label>
                  </h4>
                  <div class="faq_answer">
                    <p>
                      弊社と協議してオークション開始価格を決めます。
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </v-tab-item>
        </v-tabs-items> -->
        <div class="faq_list">
          <article class="faq_item">
            <input id="faq1" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq1">
                  アプリはございますか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  現在はブラウザ版のみとなっていますが、今後はアプリも開発する予定です。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq2" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq2">
                  口座開設に制限はありますか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  非日本居住者または、20歳未満もしく満80歳以上のお客様には、口座開設をお断りさせていただきます。<br />
                  予めご了承ください。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq3" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq3">
                  口座開設にかかる日数を教えてください。
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  必要書類の提出後に不備が無ければ、最長5営業日となります。<br />
                  ただし、システムメンテナンス等の事情により、それ以上かかる場合もございます。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq4" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq4">
                  口座開設する際に、管理費や年会費はかかりますか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  全て無料です。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq5" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq5">
                  メールマガジンを停止出来ますか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  ログイン後に「ユーザー情報」→「アカウント/通知設定」にて設定できます。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq6" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq6">
                  落札後の流れを教えてください。
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  オークション完了後、落札者に落札通知および入金用の振込口座を記載したメールを送信致します。<br />
                  メールに記載する締切日までに指定振込口座に必要金額を振り込んで頂きます。<br />
                  入金が確認されましたら、出品者から商品が発送されます。
                </p>
              </div>
            </div>
          </article>
          <article class="faq_item">
            <input id="faq7" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq7">
                  口座名義と本人名義が違っている場合、入出金は可能ですか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  いいえ。「犯罪による収益の移転防止に関する法律（犯罪収益移転防止法）」により、ご本人様による入金・出金であるか否かの確認が求められているため、入金・出金は取引口座のご本人様名義でのみ可能です。
                </p>
              </div>
            </div>
          </article>
          <!-- <article class="faq_item">
            <input id="faq8" type="checkbox" class="faq_switch" />
            <div class="faq_content">
              <h4 class="faq_question">
                <label for="faq8">
                  分配金は確定申告の対象になりますか？
                </label>
              </h4>
              <div class="faq_answer">
                <p>
                  分配金は課税対象になりますので、確定申告を行ってください。
                </p>
              </div>
            </div>
          </article> -->
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: null
    };
  },
  created: async function() {},
  mounted: async function() {},
  methods: {}
};
</script>
