<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <ValidationProvider v-slot="{ errors }" :name="title" :rules="valrule">
        <v-text-field
          dense
          outlined
          single-line
          :max="digits"
          :name="title"
          :type="number ? 'number' : 'text'"
          :readonly="!editable"
          :placeholder="placeholder"
          :value="value"
          :error-messages="errors"
          :label="label"
          :hint="hint"
          :counter="counter"
          @input="inputValue"
          @blur="handleBlur"
          @keydown="keydown"
        ></v-text-field>
      </ValidationProvider>
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
    label: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ""
    },
    valrule: {
      type: String,
      default: ""
    },
    counter: {
      type: Number,
      default: null
    },
    hint: {
      type: String,
      default: undefined
    },
    number: {
      type: Boolean,
      default: false
    },
    keydown: {
      type: Function,
      default: () => []
    },
    digits: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      text: this.value
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
