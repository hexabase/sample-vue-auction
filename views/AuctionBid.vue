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
          <p class="musicInfo_artist">{{ singer1 }}</p>
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
              <dt>参加規定</dt>
              <dd>
                5万円を超える入札時入札保証金（入札金の５％）が自動的に差し引かれます。<br />
                再入札時差額入札保証金が差し引か返されます。<br />
                入札最終日には、親の数量・上位金額の再入札のみ可能です。<br />
                最終未落札時入札保証金は、自動的に返されます。
              </dd>
              <dt>キャンセルポリシー</dt>
              <dd>
                入札キャンセル入札保証金は、私の財布に自動的に返されます。<br />
                入札最終日はキャンセルが不可で上位数量・上位金額の再入札のみ可能です。<br />
                落札後未入金などの理由で落札取り消しの際入札保証金は返されません。<br />
                私の入札価格に比べ、最近１年著作権料（％）<br />
                7.7％
              </dd>
              <dd>
                *住民登録番号を提供していただければ他の所得税最低限（取引単位あたり50,000円以下課税額なしで分離課税可能）を適用した源泉徴収業務をSYZYGYから代理して進めています。分離課税が適用されても、年間その他の所得が300万円を超過する場合には、お客様が全額を総合所得課税標準に加算することにより申告する必要がありする義務があります。
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <section class="trend">
      <div class="content">
        <h2 class="trend_title">最近の動向</h2>
        <div class="trend_wrap">
          <section class="trend_barChart">
            <h3 class="trend_subTitle">最近5年間の著作権料</h3>
            <!-- <img src="~@/assets/img/auction-detail-graph1.png" alt="" /> -->
            <div class="trend_graph">
              <Chart
                v-if="loaded"
                :data="chart1.data"
                :options="chart1.options"
              ></Chart>
            </div>
          </section>
          <section class="trend_royalty">
            <h3 class="trend_subTitle">
              最近12ヶ月の著作権料
            </h3>
            <!-- <img src="~@/assets/img/auction-detail-graph2.png" alt="" /> -->
            <div class="trend_graph">
              <Chart
                v-if="loaded"
                :data="chart2.data"
                :options="chart2.options"
              ></Chart>
            </div>
          </section>
        </div>
      </div>
    </section>
    <section class="musicDetail">
      <div class="content">
        <h2 class="musicDetail_title">Music Information</h2>
        <section class="musicDetailContent">
          <iframe
            v-if="videoUrl"
            width="640"
            height="360"
            :src="videoSourceUrl"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
          <h3 class="musicDetailContent_title">{{ title }}</h3>
          <p class="musicDetailContent_artist">{{ singer1 }}</p>
          <p class="musicDetailContent_text">{{ explanatoryText }}</p>
          <div v-if="officialUrl" class="musicDetailContent_link">
            <a :href="officialUrl" target="_blank" rel="noopener noreferrer">
              <v-icon>mdi-chevron-right</v-icon>
              <span>オフィシャルサイト</span>
            </a>
          </div>
        </section>
      </div>
    </section>
    <section class="royaltyInfo">
      <div class="content">
        <h2 class="royaltyInfo_title">著作権情報</h2>
        <ul class="royaltyInfo_list">
          <li>
            <span class="royaltyInfo_label">公表日</span>
            {{ publicationDate }}
          </li>
          <li>
            <span class="royaltyInfo_label">歌手</span>
            {{ singer1 }}
          </li>
          <li>
            <span class="royaltyInfo_label">作曲</span>
            {{ composer1 }}
          </li>
          <li>
            <span class="royaltyInfo_label">作詞</span>
            {{ lyricist1 }}
          </li>
          <li>
            <span class="royaltyInfo_label">編曲</span>
            {{ arranger1 }}
          </li>
          <li>
            <span class="royaltyInfo_label">権利期間</span>
            {{ protectionPeriod }}
          </li>
          <li>
            <span class="royaltyInfo_label">
              組成・運営業者名
            </span>
            SYZYGY株式会社
          </li>
          <li>
            <span class="royaltyInfo_label">法的類型</span>
            匿名組合契約
          </li>
          <li>
            <span class="royaltyInfo_label">出資対象</span>
            楽曲の著作権使用料
          </li>
          <li>
            <span class="royaltyInfo_label">オークション期間（申込期間）</span>
            ～{{ auctionEndDate | moment }} {{ auctionEndTime }}
          </li>
          <li>
            <span class="royaltyInfo_label">募集口数</span>
            {{ auctionAmount }}
          </li>
          <!-- <li>
            <span class="royaltyInfo_label">その他の主な事項</span>
            {{ otherNotes }}
          </li> -->
        </ul>
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

        <PdfDownload
          v-if="!displayBidResultFlag"
          :value="docDefinition"
          :pdf-file="pdfFile"
          :fileName="fileName"
          buttonName="交付書面を確認する"
          @click="confirmDeliveryDocument"
        ></PdfDownload>

        <section class="bidGuideline">
          <h3 class="bidGuideline_title">利用規約</h3>
          <div class="bidGuideline_body">
            <p class="bidGuideline_text">
              ヤフオク!とは<br />
              ヤフオク!（以下「本サービス」といいます）とは、お客様間の商品の売買や役務の提供（以下、商品と役務を合わせて「商品等」といいます）にかかる取引の機会を提供するサービスです。<br />
              本サービスは、お客様間の交渉を通じて商品等にかかる契約締結の機会を提供するものにすぎません。お客様間の商品等の販売または提供にかかる契約は、取引条件に関する双方の意思が合致したときに成立します。お客様間で商品等の販売または提供に関する取引条件をよくご確認いただき、取引を行うかどうかの判断はお客様ご自身で行ってください。<br />
              本サービスの利用を契機としてお客様間で成立した契約に基づく商品の送付または役務の提供、代金の支払、代金の回収等の一切の事項については、Yahoo!かんたん決済利用規約に定める当社の義務を除き、お客様の責任となります。当社は、当該契約に関して契約当事者としての責任、権利および権限は一切有さず、当該契約について一切の責任を負いません。<br />
              当社所定の条件に該当する商品は、PayPayフリマにも掲載されます。PayPayフリマに掲載された商品の出品者および落札者には、ヤフオク!ガイドラインとあわせて、ヤフオク!ガイドライン細則第2編PayPayフリマ掲載特約が適用され、当社は、当該特約に基づき、お客様間で成立した売買契約を解除することがあります。<br />
              本サービスのご利用に際しての順守事項および利用条件は、ヤフオク!ガイドライン細則やヘルプページにも詳しく記載されていますので、こちらも必ずご確認ください。これら当社所定のルールについても当ガイドラインの一部を構成し、当該ルールに違反した場合には、当ガイドラインに違反したものとみなします。<br />
              利用資格<br />
              本サービスを利用するには、出品する場合、入札する場合それぞれに応じて以下の利用資格を全て満たし、かつ、本サービスの利用期間中、これを継続して維持する必要があります。また、複数のYahoo!JAPANIDを利用する場合は、Yahoo!JAPANIDごとに以下資格を満たしていることが必要です。<br />
              A.出品に必要な利用資格<br />
              本サービスに商品等の情報を掲載（以下「出品」といい、出品するお客様を「出品者」といいます）するには、以下の条件を全て満たしていることが必要です。<br />
              （ア）満年齢が18歳以上であること<br />
              未成年者が出品を行う場合は、事前に保護者等の法定代理人の同意を得ていただく必要があります。その他、利用者の年齢に関し特にご注意いただきたい事項はこちらのページに記載されていますので、よくご確認のうえご利用ください。<br />
              （イ）消費税の納税義務を負わない方であること（ただし、消費税相当額を徴収する免税事業者を除きます）<br />
              消費税の納税義務を負う事業者および消費税相当額を徴収する免税事業者は、当社とオークションストア利用約款に基づきオークションストア利用契約を締結し、ストア出店者として出品してください。<br />
              （ウ）日本語を理解し、読み書きができること<br />
              （エ）Yahoo! JAPAN IDを取得していること<br />
              （オ）Yahoo!ウォレットに登録していること（ただし、Yahoo!ウォレットへの登録は不要である旨当社が別途指定する場合を除きます）<br />
              （カ）Yahoo!かんたん決済が利用可能な状態であること<br />
              （キ）出品形式や出品商品等により、Yahoo!プレミアムに会員登録していること<br />
              詳しくは、こちらのページに記載されていますので、よくご確認のうえご利用ください。<br />
              （ク）その他、当社所定の利用登録を完了していること<br />
              B.入札に必要な利用資格<br />
              本サービスで商品等に入札（以下「入札」といい、入札したお客様を「入札者」といいます）するには、以下の条件を全て満たしていることが必要です。<br />
              （ア）15歳以上であること（「15歳以上」とは、以下のとおりとします）<br />
              1月1日から4月1日生まれの方は、満15歳に達する年の4月1日から<br />
              4月2日から12月31日生まれの方は、満16歳に達する年の4月1日から<br />
              未成年者が入札を行う場合は、事前に保護者等の法定代理人の同意を得ていただく必要があります。その他、利用者の年齢に関し特にご注意いただきたい事項はこちらのページに記載されていますので、よくご確認のうえご利用ください。<br />
              （イ）日本語を理解し、読み書きができること<br />
              （ウ）Yahoo! JAPAN IDを取得していること<br />
              （エ）Yahoo!かんたん決済が利用可能な状態にあること
            </p>
          </div>
        </section>
        <v-checkbox
          v-model="agreeGuideline"
          label="利用規約に同意する"
        ></v-checkbox>

        <!-- /default -->
        <!-- footer スロットコンテンツ -->
        <template slot="footer">
          <Button
            class="button-action"
            :disabled="!agreeGuideline || !confirmDeliveryDocumentFlag"
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
import mapping from "@/assets/json/auctionDBMapping.json";
import MyModal from "./MyModal.vue";
import moment from "moment-timezone";
import Chart from "@/components/parts/Chart.vue";
import _ from "lodash";
import PdfDownload from "@/components/pdf/PdfDownload.vue";
export default {
  components: { MyModal, Chart, PdfDownload },
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
      mapping: JSON.parse(JSON.stringify(mapping)),
      token: this.$store.getters["auth/getToken"],
      applicationId: this.$store.getters["datas/getApplicationId"],
      datasotreIdList: this.$store.getters["datas/getDatastores"],
      datastoreIds: this.$store.getters["datas/getDatastoreIds"],
      userId: this.$store.getters["user/getMembershipNumber"],
      userName: this.$store.getters["auth/getUserNameKanji"],
      copyrightNumber: "",
      jasracCode: "",
      image1: "",
      image2: "",
      image3: "",
      copyrightType: "",
      title: "",
      titleEn: "",
      titleKr: "",
      singer1: "",
      singer2: "",
      singer3: "",
      singer4: "",
      composer1: "",
      composer2: "",
      composer3: "",
      composer4: "",
      lyricist1: "",
      lyricist2: "",
      lyricist3: "",
      lyricist4: "",
      arranger1: "",
      arranger2: "",
      arranger3: "",
      arranger4: "",
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
      videoUrl: "",
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
      videoSourceUrl: "",
      officialUrl: "",
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
      musicId: "",
      myAuctionBidList: {},
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
      // ctx: document.getElementById("bar-chart").getContext("2d"),
      chart1: {
        data: {
          labels: [],
          datasets: [
            {
              label: "分配金",
              data: [],
              backgroundColor: "#1b80cb",
              hoverBackgroundColor: "#2358d1",
              borderWidth: 0,
              barThickness: 18,
              datalabels: {
                anchor: "end",
                align: "end",
                padding: {
                  bottom: 1
                },
                formatter: function(value, context) {
                  if (!value) return 0;
                  return String(value)
                    .split("")
                    .reverse()
                    .join("")
                    .match(/\d{1,3}/g)
                    .join(",")
                    .split("")
                    .reverse()
                    .join("");
                }
              }
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20
            }
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontSize: 15
                },
                scaleLabel: {
                  display: false,
                  labelString: "年"
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
              }
            ]
          },
          plugins: {
            datalabels: {
              font: {
                size: 13
              }
            }
          }
        }
      },
      chart2: {
        data: {
          labels: [],
          datasets: [
            {
              label: "分配金",
              data: [],
              backgroundColor: "#5255d1",
              hoverBackgroundColor: "#2358d1",
              borderWidth: 0,
              barThickness: 18,
              datalabels: {
                anchor: "end",
                align: "end",
                padding: {
                  bottom: 1
                },
                formatter: function(value, context) {
                  if (!value) return 0;
                  return String(value)
                    .split("")
                    .reverse()
                    .join("")
                    .match(/\d{1,3}/g)
                    .join(",")
                    .split("")
                    .reverse()
                    .join("");
                }
              }
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20
            }
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontSize: 15
                },
                scaleLabel: {
                  display: false,
                  labelString: "年"
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                  beginAtZero: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
              }
            ]
          }
        }
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
      pdfFile: "",
      fileName: "",
      confirmDeliveryDocumentFlag: false
    };
  },
  created: function() {},
  mounted: async function() {
    await this.initialDisplay();
    if (this.token) {
      await this.getDeliveryDocument();
    }
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
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_AUCTIONBIDTABLE_ID,
        {
          conditions: [
            {
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.musicId],
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
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.musicId],
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
    async getDistributionList() {
      return await this.$hexalink.getPublicItems(
        window.env.VUE_APP_APPLICATION_ID,
        window.env.table.VUE_APP_COPYRIGHTDISTRIBUTIONTABLE_ID,
        {
          conditions: [
            {
              id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [this.musicId],
              exact_match: true // 完全⼀致で検索
            },
            {
              id: "日付", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: [
                moment()
                  .add("year", -4)
                  .startOf("year")
                  .format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
                moment()
                  .endOf("year")
                  .format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z"
              ]
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
            this.datastoreIds["オークション入札状況DB"],
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
          setData["著作権番号"] = this.musicId;
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
            this.datastoreIds["オークション入札状況DB"],
            param
          );
          this.modal = false;
        }
        await this.initialDisplay();
      } catch (e) {
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
          this.datastoreIds["オークション入札状況DB"],
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
        await this.initialDisplay();
        this.cancelModal = false;
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
      const groups = {};
      groups["第1四半期"] = [];
      groups["第2四半期"] = [];
      groups["第3四半期"] = [];
      groups["第4四半期"] = [];
      const formatQuater = moment().format("YYYY");
      const currentQuaterArray = array.filter(function(item, index) {
        const jst = moment(item["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM");
        if (jst.indexOf(formatQuater) !== -1) return true;
      });
      for (const key in currentQuaterArray) {
        const jstMonth = moment(currentQuaterArray[key]["日付"])
          .tz("Asia/Tokyo")
          .format("YYYY-MM")
          .slice(5, 7);
        switch (jstMonth) {
          case "01":
          case "02":
          case "03":
            groups["第1四半期"].push(currentQuaterArray[key]);
            break;
          case "04":
          case "05":
          case "06":
            groups["第2四半期"].push(currentQuaterArray[key]);
            break;
          case "07":
          case "08":
          case "09":
            groups["第3四半期"].push(currentQuaterArray[key]);
            break;
          case "10":
          case "11":
          case "12":
            groups["第4四半期"].push(currentQuaterArray[key]);
            break;
        }
      }
      return groups;
    },
    async initialDisplay() {
      try {
        // loading overlay表示
        this.$store.commit("common/setLoading", true);
        this.musicId = this.$route.params.id;
        this.myAuctionBidList = await this.getAuctionBidList();
        if (
          this.myAuctionBidList.length > 0 &&
          this.myAuctionBidList[0].落札状況 != "キャンセル済"
        ) {
          this.displayBidResultFlag = true;
          this.confirmDeliveryDocumentFlag = true;
        } else {
          this.displayBidResultFlag = false;
          this.confirmDeliveryDocumentFlag = false;
        }
        var dataLists = [];
        dataLists = await this.$hexalink.getPublicItems(
          window.env.VUE_APP_APPLICATION_ID,
          window.env.table.VUE_APP_COPYRIGHTTABLE_ID,
          {
            conditions: [
              {
                id: "著作権番号", // Hexalink画⾯で⼊⼒したIDを指定
                search_value: [this.musicId],
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
        }

        var titleEn = "タイトル（英語）";
        var titleKr = "タイトル（韓国）";
        var explanatoryTextEn = "説明文（英語）";
        var explanatoryTextKr = "説明文（韓国）";
        this.copyrightNumber = dataLists[0].著作権番号;
        this.jasracCode = dataLists[0].JASRAC作品コード;
        this.image2 = dataLists[0].image2;
        this.image3 = dataLists[0].image3;
        this.copyrightType = dataLists[0].著作権タイプ;
        this.title = dataLists[0].タイトル;
        this.titleEn = dataLists[0].titleEn;
        this.titleKr = dataLists[0].titleKr;
        this.singer1 = dataLists[0].歌手1;
        this.singer2 = dataLists[0].歌手2;
        this.singer3 = dataLists[0].歌手3;
        this.singer4 = dataLists[0].歌手4;
        this.composer1 = dataLists[0].作曲1;
        this.composer2 = dataLists[0].作曲2;
        this.composer3 = dataLists[0].作曲3;
        this.composer4 = dataLists[0].作曲4;
        this.lyricist1 = dataLists[0].作詞1;
        this.lyricist2 = dataLists[0].作詞2;
        this.lyricist3 = dataLists[0].作詞3;
        this.lyricist4 = dataLists[0].作詞4;
        this.arranger1 = dataLists[0].編曲1;
        this.arranger2 = dataLists[0].編曲2;
        this.arranger3 = dataLists[0].編曲3;
        this.arranger4 = dataLists[0].編曲4;
        this.explanatoryText = dataLists[0].説明文;
        this.explanatoryTextEn = dataLists[0].explanatoryTextEn;
        this.explanatoryTextKr = dataLists[0].explanatoryTextKr;
        this.publicationDate = dataLists[0].公表日;
        this.originalAuthorDeathDate = dataLists[0].原作者死亡日;
        this.protectionPeriod = dataLists[0].保護期間;
        this.aaHoldingInterest = dataLists[0].AA権保有持分;
        this.bbHoldingInterest = dataLists[0].BB権保有持分;
        this.ccHoldingInterest = dataLists[0].CC権保有持分;
        this.ddHoldingInterest = dataLists[0].DD権保有持分;
        this.eeHoldingInterest = dataLists[0].EE権保有持分;
        this.possessionNotes = dataLists[0].持ち分注意事項;
        this.videoUrl = dataLists[0].動画URL;
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
        this.officialUrl = dataLists[0].公式URL;
        this.bidPrice =
          this.myAuctionBidList.length > 0
            ? this.myAuctionBidList[0].入札金額
            : dataLists[0].オークション開始金額;
        this.bidAmount =
          this.myAuctionBidList.length > 0 ? this.myAuctionBidList[0].数量 : 1;
        this.videoSourceUrl =
          "https://www.youtube.com/embed/" +
          dataLists[0].動画URL.split("v=")[1];

        const image1Binary = dataLists[0].image1;
        if (image1Binary) {
          const ab = await this.$hexalink.getPublicFile(
            image1Binary,
            window.env.VUE_APP_WORKSPACE_ID
          );
          const blob = new Blob([ab], { type: "image/jpeg" });
          this.image1 = window.URL.createObjectURL(blob);
        } else {
          this.image1 = "";
        }
        if (dataLists[0].交付書面) {
          const ab = await this.$hexalink.getPublicFile(
            dataLists[0].交付書面,
            window.env.VUE_APP_WORKSPACE_ID
          );
          const blob = new Blob([ab], { type: "application/pdf" });
          this.pdfFile = URL.createObjectURL(blob);
        }

        var rpf_bidAmount = "4384d821-8e19-4e08-949b-44cab6efa408";
        var rpf_copyrightNumber = "d3e553f2-7281-47b7-96ef-3ac55a72f1ee";
        var rpf_bidPrice = "d2813a9b-33e5-405f-9116-ff9c97a0bf06";

        // diffメソッドを使って、日時の差を、ミリ秒で取得
        const diff = moment(this.auctionEndDate).diff(moment());
        if (diff < 0 || this.applicabilityOnHomepage !== "掲載する") {
          this.auctionFinishedFlag = true;
        }

        var auctionLists = [];
        auctionLists = await this.$hexalink.getPublicReports(
          window.env.VUE_APP_APPLICATION_ID,
          window.env.report.VUE_APP_AUCTIONBIDAGGREGATIONREPORT_ID,
          {
            conditions: [
              {
                rpf_id: "d3e553f2-7281-47b7-96ef-3ac55a72f1ee",
                search_value: [this.musicId]
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

        const distributionList = await this.getDistributionList();
        const distributionListGroupYear = this.groupByYear(distributionList);
        for (let i = 4; i > -1; i--) {
          this.distributionListGroupYear.labels.push(
            moment()
              .add("year", -i)
              .format("YYYY")
          );
        }
        for (const keyYear of this.distributionListGroupYear.labels) {
          let yearDistribution = 0;
          for (const keyMonth in distributionListGroupYear[keyYear]) {
            yearDistribution += Number(
              distributionListGroupYear[keyYear][keyMonth].分配金額
            );
          }
          this.distributionListGroupYear.data.push(yearDistribution);
        }
        this.chart1.data.labels = this.distributionListGroupYear.labels;
        this.chart1.data.datasets[0].data = this.distributionListGroupYear.data;

        const distributionListGroupQuarter = this.groupByQuarter(
          distributionList
        );
        this.distributionListGroupQuarter.labels = Object.keys(
          distributionListGroupQuarter
        );
        for (const keyYear in distributionListGroupQuarter) {
          let quaterDistribution = 0;
          for (const keyMonth in distributionListGroupQuarter[keyYear]) {
            quaterDistribution += Number(
              distributionListGroupQuarter[keyYear][keyMonth].分配金額
            );
          }
          this.distributionListGroupQuarter.data.push(quaterDistribution);
        }
        this.chart2.data.labels = this.distributionListGroupQuarter.labels;
        this.chart2.data.datasets[0].data = this.distributionListGroupQuarter.data;
        this.loaded = true;

        this.updateMessage();
        this.agreeGuideline = false;

        if (this.token) this.userInfo = await this.getUserInfo();
        if (this.userInfo && this.userInfo.length > 0) {
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
    applyUserInfo() {
      if (this.token) {
        this.$router
          .push({ name: "UserInfo", params: { fromBid: true } })
          .catch(() => {});
      } else {
        this.$router.push("/registration").catch(() => {});
      }
    },
    confirmDeliveryDocument() {
      this.confirmDeliveryDocumentFlag = true;
    },
    async getDeliveryDocument() {
      const result = await this.$hexalink.getItems(
        this.token,
        this.applicationId,
        this.datastoreIds["交付書面管理テーブル"],
        {
          conditions: [
            {
              id: "管理番号", // Hexalink画⾯で⼊⼒したIDを指定
              search_value: ["1"],
              exact_match: true // 完全⼀致で検索
            }
          ],
          page: 1,
          per_page: 9000,
          use_display_id: true
        }
      );
      const image1Binary = result[0].保管用画像;
      if (image1Binary) {
        const ab = await this.$hexalink.getFile(this.token, image1Binary);
        const blob = new Blob([ab], { type: "image/jpeg" });
        const reader = new FileReader();
        reader.onload = e => {
          const b64 = reader.result;
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
          this.docDefinition.content.push({
            image: b64,
            width: 500
          });
        };
        reader.readAsDataURL(blob);
      }
      // if (result[0].交付書面PDF) {
      //   const ab = await this.$hexalink.getFile(
      //     this.token,
      //     result[0].交付書面PDF
      //   );
      //   const blob = new Blob([ab], { type: "application/pdf" });
      //   this.pdfFile = URL.createObjectURL(blob);
      // }
      this.fileName =
        "delivery-document_" +
        this.userId +
        "_" +
        moment().format("YYYYMMDDTHHmmssSSS") +
        ".pdf";
    }
  },
  beforeDestroy: function() {
    clearInterval(this.counterInterval);
  }
};
</script>

<style scoped></style>
