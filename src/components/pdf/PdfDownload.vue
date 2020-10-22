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
import pdfMake from "pdfmake/build/pdfmake.js";
import "pdfmake/build/vfs_fonts.js";
import Axios from "axios";
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
    fileName: {
      type: String,
      default: ""
    }
  },
  methods: {
    onDownloadPDFClickWithPDFMake() {
      const me = this;
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
        // const result = pdfMake.createPdf(docDefinition);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        // pdfDocGenerator.download();
        pdfDocGenerator.getBlob(blob => {
          // クラウドストレージへのアップロード
          const config = {
            baseUrl:
              "https://storageaccountclosia559.blob.core.windows.net/delivery-document/" +
              this.fileName, // baseUrl for blob file uri (i.e. http://<accountName>.blob.core.windows.net/<container>/<blobname>),
            sasToken:
              "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2999-02-04T13:24:29Z&st=2020-10-21T05:24:29Z&spr=https&sig=TPcxoK2EyYLCTAN1L5SKgK8qqCdQGfSnl51gy1BPJsE%3D", // Shared access signature querystring key/value prefixed with ?,
            file: blob, // File object using the HTML5 File API,
            progress: console.log("progress"), // progress callback function,
            complete: console.log("complete"), // complete callback function,
            error: console.log("error"), // error callback function,
            blockSize: null // Use this to override the DefaultBlockSize,
          };
          const httpConfig = {
            headers: {
              authorizaion: "Bearer token123"
            }
          };
          const axios = Axios.create(httpConfig);
          me.$azureUpload(config, axios);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
