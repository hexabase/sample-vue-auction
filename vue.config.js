module.exports = {
  publicPath: "/",
  devServer: {
    port: 5003,
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
  transpileDependencies: ["vuetify", "vue-json-csv"]
};
