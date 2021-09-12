const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./index.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    hot: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false }),
  ],
};
