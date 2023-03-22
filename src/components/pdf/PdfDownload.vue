<template>
  <button
    type="button"
    class="btn btn-refresh no-margin"
    :value="value"
    :pdfFile="pdfFile"
    :pdfFileBuffer="pdfFileBuffer"
    :disabled="disabled"
    @click="multipleHandler"
  >
    {{ buttonName }}
  </button>
</template>

<script>
import Axios from "axios";
import moment from "moment-timezone";
export default {
  name: "PdfDownload",
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    pdfFile: {
      type: String,
      default: ""
    },
    pdfFileBuffer: {
      type: Uint8Array,
      default: () => []
    },
    fileName: {
      type: String,
      default: ""
    },
    buttonName: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    multipleHandler(event) {
      this.clickHandler(event);
    },
    clickHandler: function(e) {
      if (this.disabled) {
        return;
      }
      this.$emit("click", e);
    }
  }
};
</script>
