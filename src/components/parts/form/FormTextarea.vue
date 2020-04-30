<template>
  <v-row>
    <v-col>
      <p>
        {{ title }}
        <span v-if="required" class="red--text">※</span>
      </p>
      <validation-provider v-slot="{ errors }" :name="title" :rules="valrule">
        <v-textarea
          counter
          no-resize
          outlined
          :rows="rows"
          :value="value"
          :disabled="!editable"
          :error-messages="errors"
          @input="inputValue"
        ></v-textarea>
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
    value: {
      type: String,
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
    }
  }
};
</script>
