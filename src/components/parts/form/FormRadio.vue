<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <validation-provider
        v-slot="{ errors }"
        :name="title"
        :rules="valrule"
        class="radio"
      >
        <v-radio-group
          :value="radiochecked"
          row
          :readonly="!editable"
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
    },
    radiochecked: {
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
