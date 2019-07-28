import merge from "webpack-merge";
import webpack from "webpack";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import { common } from "./webpack.common";

export default merge(common(), {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          mangle: true,
          ie8: false
        }
      })
    ]
  }
} as webpack.Configuration);
