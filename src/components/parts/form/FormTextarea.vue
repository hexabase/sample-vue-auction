<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <validation-provider
        v-slot="{ errors, valid }"
        :name="title"
        :rules="valrule"
      >
        <v-textarea
          v-model="textarea"
          outlined
          auto-grow
          :rows="rows"
          :counter="counter"
          :value="value"
          :hint="hint"
          :readonly="!editable"
          :error-messages="errors"
          :success="valid"
          @input="inputValue"
          @blur="handleBlur"
        ></v-textarea>
      </validation-provider>
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
    placeholder: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    },
    rows: {
      type: String,
      default: "1"
    },
    counter: {
      type: Number,
      default: null
    },
    hint: {
      type: String,
      default: undefined
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
      textarea: this.value
    };
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
