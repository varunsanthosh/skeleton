import path from "path";
import Dotenv from "dotenv";
import webpack from "webpack";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";

const IN_PRODUCTION =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";
if (!IN_PRODUCTION) {
  // process.env in localhost
  Dotenv.config();
}

const { NODE_ENV } = process.env;

export const common = () => ({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, ".build"),
    publicPath: "/",
    crossOriginLoading: "anonymous",
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.join(__dirname, "src")
    ],
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ]
  },
  module: {
    rules: [
      {
        test: /\.(sa|c)ss$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(html|svg|jpe?g|png|ttf|woff2?|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "static/[name].[ext]"
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({
        IN_PRODUCTION: IN_PRODUCTION,
        NODE_ENV: NODE_ENV
      })
    ),

    new HtmlWebpackPlugin({
      test: /\.ejs$/,
      use: {
        loader: 'ejs-compiled-loader',
        options: {
          htmlmin: true,
          htmlminOptions: {
            removeComments: true
          }
        }
      },
      inject: true,
      production: IN_PRODUCTION,
      hooks: [
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: "defer"
        })
      ],
      minify: IN_PRODUCTION && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
});
