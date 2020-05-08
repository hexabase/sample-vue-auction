module.exports = {
  publicPath: "/",
  devServer: {
    port: 5004,
    proxy: {
      "/linker-api": {
        target: "https://az-api.hexabase.com",
        ws: false,
        secure: false,
        pathRewrite: {
          "^/linker-api": "/api/v0"
        }
      },
      "/sendgrid": {
        target: "https://api.sendgrid.com/v3",
        ws: false,
        secure: false,
        pathRewrite: {
          "^/sendgrid": ""
        }
      }
    }
  },
  configureWebpack: {
    devtool: "source-map"
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/scss/utils/variables.scss";'
      }
    }
  },
  transpileDependencies: ["vuetify", "vue-json-csv"]
};
