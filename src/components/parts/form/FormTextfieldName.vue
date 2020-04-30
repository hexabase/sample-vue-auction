<template>
  <v-row align="center" justify="center">
    <v-col cols="3">
      <p>
        {{ title }}
        <span :required="required" class="red--text">※</span>
      </p>
    </v-col>
    <v-col cols="1">
      <p class="text-center">
        <template v-if="kana">
          <template v-if="corp">ホウジンメイ</template>
          <template v-else>セイ</template>
        </template>
        <template v-else-if="corp">法人名</template>
        <template v-else>姓</template>
      </p>
    </v-col>
    <v-col cols="3">
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
          @input="inputValue"
        ></v-text-field>
      </validation-provider>
    </v-col>
    <v-col cols="1">
      <p class="text-center">
        <template v-if="kana">
          <template v-if="corp">ホウジンダイヒョウシャ</template>
          <template v-else>メイ</template>
        </template>
        <template v-else-if="corp">法人代表者</template>
        <template v-else>名</template>
      </p>
    </v-col>
    <v-col cols="3">
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
          @input="inputValue"
        ></v-text-field>
      </validation-provider>
    </v-col>
  </v-row>
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
        return s;
      },
      set: function(value) {
        this.fullName = value.trim() + this.delimiter + this.mei;
      }
    },
    mei: {
      get: function() {
        let m = "";
        if (this.value.split(this.delimiter).length == 2) {
          m = this.value.split(this.delimiter)[1];
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
  },
  methods: {
    inputValue: function() {
      this.$emit("input", this.fullName);
    }
  }
};
</script>
