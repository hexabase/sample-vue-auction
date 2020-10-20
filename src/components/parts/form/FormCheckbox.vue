<template>
  <div class="formItem">
    <div class="formItem_title">
      {{ title }}
      <span v-if="required" class="formItem_required">※</span>
    </div>
    <div class="formItem_body">
      <validation-provider v-slot="{ errors }" :name="title" :rules="valrule">
        <template v-for="checkbox in checkboxes">
          <v-checkbox
            :key="checkbox.label"
            v-model="selected"
            :label="checkbox.label"
            :value="checkbox.value"
            :error-messages="errors"
            @change="inputValue"
          />
        </template>
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
    checkboxes: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    valrule: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: this.value
    };
  },
  methods: {
    inputValue: function(e) {
      this.$emit("change", e);
    }
  }
};
</script>
