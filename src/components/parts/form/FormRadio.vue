<template>
  <v-row align="center" justify="center">
    <v-col cols="3">
      <p>
        {{ title }}
        <span v-if="required" class="red--text">※</span>
      </p>
    </v-col>
    <v-col cols="8">
      <validation-provider v-slot="{ errors }" :name="title" :rules="valrule">
        <v-radio-group
          :value="value"
          row
          :disabled="!editable"
          :error-messages="errors"
          @change="inputValue"
        >
          <template v-for="radio in radios">
            <v-radio
              :key="radio.label"
              :label="radio.label"
              :value="radio.value"
            />
          </template>
        </v-radio-group>
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
    editable: {
      type: Boolean,
      default: true
    },
    radios: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: "無"
    },
    valrule: {
      type: String,
      default: ""
    }
  },
  methods: {
    inputValue: function(e) {
      this.$emit("change", e);
    }
  }
};
</script>
