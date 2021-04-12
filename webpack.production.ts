import merge from "webpack-merge";
import { common } from "./webpack.common";

const TerserPlugin = require('terser-webpack-plugin');


export default merge(common(), {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({parallel: true})
    ]
  }
} as Object);
