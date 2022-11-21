const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const path = require("path");

module.exports = merge(webpackConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public/"),
      publicPath: `http://localhost:3001/`,
    },
    hot: true, //HMR
    port: 3001,
    open: true, // open the default browser on start
  },
});
