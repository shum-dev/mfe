const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      // this project will use a couple of custom fonts and images
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.scss|\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
      },
      // transpile rules
      {
        // all .js files will be processed by babel
        test: /\.m?js$/,
        // exclude node_modules
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // "@babel/preset-env" enables new syntax as ES2016 ES2017 etc.
            presets: ["@babel/preset-env"],
            // "@babel/plugin-transform-runtime" enables different feature inside our browser
            // such as async/await syntax etc.
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
