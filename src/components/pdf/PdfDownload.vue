<template>
  <button
    type="button"
    class="btn btn-refresh no-margin"
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
      const defaultStyle = "GenShin";

      // PDF出力する内容の定義
      const docDefinition = {
        content: [
          {
            text: "サンプルPDF",
            style: "header"
          },
          {
            text: "サンプルです。",
            style: "subheader"
          },
          {
            text: "※これはただのサンプルです。",
            style: { color: "red", fontSize: 10 }
          },
          {
            layout: "lightHorizontalLines",
            table: {
              headerRows: 1,
              widths: ["*", "auto", 100, "*"],
              body: [
                ["いち", "に", "さん", "よん"],
                ["Value 1", "Value 2", "Value 3", "Value 4"],
                [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"]
              ]
            }
          }
        ],
        defaultStyle: {
          font: defaultStyle
        },
        styles: {
          header: {
            fontSize: 30
          },
          subheader: {
            fontSize: 20
          }
        }
      };
      try {
        // pdfMakeでのPDF出力
        const result = pdfMake.createPdf(docDefinition);
        result.download();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
