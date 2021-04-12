import path from "path";
import merge from "webpack-merge";
import webpack from "webpack";
import { common } from "./webpack.common";

module.exports = merge(common(), {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: [
      path.resolve(__dirname, "./src"),
      path.resolve(__dirname, "./.build")
    ],
    historyApiFallback: true,
    port: 3000,
    host: "localhost",
    hot: true,
    compress: false
  }
} as webpack.Configuration);
