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
          type="password"
          :disabled="!editable"
          :placeholder="placeholder"
          :value="value"
          :error-messages="errors"
          :label="label"
          @input="inputValue"
          @blur="handleBlur"
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
