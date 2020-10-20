<template>
  <button
    type="button"
    class="btn btn-refresh no-margin"
    :value="value"
    :pdfFile="pdfFile"
    @click="onDownloadPDFClickWithPDFMake"
  >
    PDFダウンロード
  </button>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts.js";
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
    }
  },
  methods: {
    onDownloadPDFClickWithPDFMake() {
      pdfMake.fonts = {
        GenShin: {
          normal: "GenShinGothic-Normal-Sub.ttf",
          bold: "GenShinGothic-Normal-Sub.ttf",
          italics: "GenShinGothic-Normal-Sub.ttf",
          bolditalics: "GenShinGothic-Normal-Sub.ttf"
        }
      };
      const docDefinition = this.value;
      try {
        window.open(this.pdfFile);
        // pdfMakeでのPDF出力
        const result = pdfMake.createPdf(docDefinition);
        // クラウドストレージへのアップロード
        result.download();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
