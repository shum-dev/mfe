// allows us to merge two different webpack config files
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");

const packg = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      shared: packg.dependencies,
    }),
  ],
};

// devConfig will override the commonConfig properties if they collide
module.exports = merge(commonConfig, devConfig);
