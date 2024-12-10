// allows us to merge two different webpack config files
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");

const packg = require("../package.json");

// this variable wiil hold the value of MFE url where it will be deployed to
// we will get to know exact value for it after we deploy the MFE
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  // changing the mode makes webpack to act differently
  // all files are going to be more optimized
  // and the bundle is going to be much smaller
  mode: "production",
  output: {
    // set a template for hashing output files
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
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
module.exports = merge(commonConfig, prodConfig);
