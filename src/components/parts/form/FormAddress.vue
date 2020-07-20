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
            :value="value"
            :error-messages="errors"
            hint="数字３桁"
            @input="inputValue"
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
            :value="value"
            :error-messages="errors"
            hint="数字4桁"
            @input="inputValue"
            @blur="handleBlur"
          ></v-text-field>
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
            :value="value"
            :error-messages="errors"
            hint="都道府県 市区町村 丁目 番地"
            @input="inputValue"
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
            :value="value"
            :error-messages="errors"
            hint="ビル名 号室"
            @input="inputValue"
            @blur="handleBlur"
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
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ""
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
    }
  },
  methods: {
    inputValue: function(e) {
      this.$emit("input", e);
    },
    handleBlur: function(e) {
      this.$emit("blur", e);
    }
  }
};
</script>
