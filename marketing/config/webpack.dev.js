// allows us to merge two different webpack config files
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");

const packg = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      // name for the variable where this module will be stored
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packg.dependencies,
    }),
  ],
};

// devConfig will override the commonConfig properties if they collide
module.exports = merge(commonConfig, devConfig);
