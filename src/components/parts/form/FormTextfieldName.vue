<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <div class="formItem_itemWrap">
        <span class="formItem_subLabel">
          <template v-if="kana">
            <template v-if="corp">ホウジンメイ</template>
            <template v-else>セイ</template>
          </template>
          <template v-else-if="corp">法人名</template>
          <template v-else>姓</template>
        </span>
        <validation-provider
          v-slot="{ errors }"
          :name="kana == true ? 'セイ' : '姓'"
          :rules="valrule"
        >
          <v-text-field
            v-model="sei"
            dense
            outlined
            single-line
            :label="label"
            :disabled="!editable"
            :error-messages="errors"
            :placeholder="setPlaceholder('sei')"
            @input="inputValue"
          >
          </v-text-field>
        </validation-provider>
        <span class="formItem_subLabel">
          <template v-if="kana">
            <template v-if="corp">ホウジンダイヒョウシャ</template>
            <template v-else>メイ</template>
          </template>
          <template v-else-if="corp">法人代表者</template>
          <template v-else>名</template>
        </span>
        <validation-provider
          v-slot="{ errors }"
          :name="kana == true ? 'メイ' : '名'"
          :rules="valrule"
        >
          <v-text-field
            v-model="mei"
            dense
            outlined
            single-line
            :label="label"
            :disabled="!editable"
            :error-messages="errors"
            :placeholder="setPlaceholder('mei')"
            @input="inputValue"
          ></v-text-field>
        </validation-provider>
      </div>
    </div>
  </div>
</template>

<script>
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
    label: {
      type: String,
      default: ""
    },
    kana: {
      type: Boolean,
      default: false
    },
    corp: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ""
    },
    valrule: {
      type: String,
      default: ""
    },
    userinfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      name: this.value,
      delimiter: ""
    };
  },
  computed: {
    fullName: {
      get: function() {
        return this.name;
      },
      set: function(value) {
        this.name = value;
      }
    },
    sei: {
      get: function() {
        let s = "";
        if (this.value.split(this.delimiter).length == 2) {
          s = this.value.split(this.delimiter)[0];
        }
        if (this.userinfo[0]) {
          if (this.kana && this.userinfo[0]["苗字（カタカナ）"]) {
            s = this.userinfo[0]["苗字（カタカナ）"];
          }
          if (!this.kana && this.userinfo[0].苗字) {
            s = this.userinfo[0].苗字;
          }
        }
        return s;
      },
      set: function(value) {
        this.fullName = value.trim() + this.delimiter + this.mei;
        console.log(value);
      }
    },
    mei: {
      get: function() {
        let m = "";
        if (this.value.split(this.delimiter).length == 2) {
          m = this.value.split(this.delimiter)[1];
        }
        if (this.userinfo[0]) {
          if (this.kana && this.userinfo[0]["名前（カタカナ）"]) {
            m = this.userinfo[0]["名前（カタカナ）"];
          }
          if (!this.kana && this.userinfo[0].名前) {
            m = this.userinfo[0].名前;
          }
        }
        return m;
      },
      set: function(value) {
        this.fullName = this.sei + this.delimiter + value.trim();
      }
    }
  },
  created() {
    this.delimiter = this.kana ? " " : "　";
    console.log(this.userinfo[0]);
  },
  methods: {
    inputValue: function() {
      this.$emit("input", this.fullName);
    },
    setPlaceholder: function(type) {
      if (this.corp) {
        return;
      }
      let text = "";
      if (type === "sei") {
        text = this.kana ? "ヤマダ" : "山田";
      } else if (type === "mei") {
        text = this.kana ? "タロウ" : "太郎";
      }
      return "例）" + text;
    }
  }
};
</script>
