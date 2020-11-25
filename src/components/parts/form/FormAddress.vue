<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <div class="formItem_itemWrap">
        <span class="formItem_subLabel">〒</span>
        <validation-provider
          v-slot="{ errors }"
          name="zip1"
          :rules="zip1rule"
          class="zip1"
        >
          <v-text-field
            dense
            outlined
            single-line
            type="number"
            :disabled="!editable"
            placeholder=""
            :value="value.zip1"
            :error-messages="errors"
            hint="数字３桁"
            @input="inputValue($event, 'zip1')"
            @blur="handleBlur"
          ></v-text-field>
        </validation-provider>
        <span class="formItem_subLabel">ー</span>
        <validation-provider
          v-slot="{ errors }"
          name="zip2"
          :rules="zip2rule"
          class="zip2"
        >
          <v-text-field
            dense
            outlined
            single-line
            type="number"
            :disabled="!editable"
            placeholder=""
            :value="value.zip2"
            :error-messages="errors"
            hint="数字4桁"
            @input="inputValue($event, 'zip2')"
            @blur="handleBlur"
          ></v-text-field>
        </validation-provider>
        <!-- <a class="formItem_link">住所表示</a> -->
      </div>
      <div class="formItem_itemWrap">
        <validation-provider
          v-slot="{ errors }"
          name="prefectures"
          :rules="prefecturesrule"
          class="prefectures"
        >
          <v-select
            :items="prefecturesItems"
            dense
            outlined
            single-line
            label="都道府県を選択"
            :value="value.prefectures"
            :disabled="!editable"
            :error-messages="errors"
            @input="inputValue($event, 'prefectures')"
          >
          </v-select>
        </validation-provider>
      </div>
      <div class="formItem_itemWrap">
        <validation-provider
          v-slot="{ errors }"
          name="address1"
          :rules="address1rule"
          class="address1"
        >
          <v-text-field
            dense
            outlined
            single-line
            type="text"
            :disabled="!editable"
            placeholder="例）東京都豊島区池袋1-2-3"
            :value="value.address1"
            :error-messages="errors"
            hint="市区町村 丁目 番地"
            @input="inputValue($event, 'address1')"
            @blur="handleBlur"
          ></v-text-field>
        </validation-provider>
      </div>
      <div class="formItem_itemWrap">
        <validation-provider
          v-slot="{ errors }"
          name="address2"
          :rules="address2rule"
          class="address2"
        >
          <v-text-field
            dense
            outlined
            single-line
            type="text"
            :disabled="!editable"
            placeholder="例）としまレジデンス１０１"
            :value="value.address2"
            :error-messages="errors"
            hint="ビル名 号室"
            @input="inputValue($event, 'address2')"
            @blur="handleBlur"
          ></v-text-field>
        </validation-provider>
      </div>
    </div>
  </div>
</template>
<script>
import KenAll from "ken-all";

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: () => {}
    },
    zip1rule: {
      type: String,
      default: ""
    },
    zip2rule: {
      type: String,
      default: ""
    },
    address1rule: {
      type: String,
      default: ""
    },
    address2rule: {
      type: String,
      default: ""
    },
    prefecturesrule: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      zip1: "",
      zip2: "",
      prefectures: "",
      address1: "",
      address2: "",
      prefecturesItems: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県",
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県",
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県",
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県",
        "鳥取県",
        "島根県",
        "岡山県",
        "広島県",
        "山口県",
        "徳島県",
        "香川県",
        "愛媛県",
        "高知県",
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県"
      ]
    };
  },
  methods: {
    inputValue: function(value, name) {
      if (name == "zip1") {
        this.zip1 = value;
        if (!this.zip2) {
          this.zip2 = this.value.zip2;
        }
        value = this.zip1 + "-" + this.zip2;
        name = "postalCode";
        KenAll(this.zip1 + this.zip2).then(res => {
          if (res.length === 0) {
            // 該当住所なし
          } else {
            this.$emit("input", {
              value: res[0][0],
              name: "prefectures"
            });
            this.$emit("input", {
              value: res[0][1] + res[0][2],
              name: "address1"
            });
          }
        });
      }
      if (name == "zip2") {
        this.zip2 = value;
        if (!this.zip1) {
          this.zip1 = this.value.zip1;
        }
        value = this.zip1 + "-" + this.zip2;
        name = "postalCode";
        KenAll(this.zip1 + this.zip2).then(res => {
          if (res.length === 0) {
            // 該当住所なし
          } else {
            console.log(res[0][0]);
            this.$emit("input", {
              value: res[0][0],
              name: "prefectures"
            });
            this.$emit("input", {
              value: res[0][1] + res[0][2],
              name: "address1"
            });
          }
        });
      }
      this.$emit("input", { value: value, name: name });
    },
    handleBlur: function(e) {
      this.$emit("blur", e);
    }
  }
};
</script>
