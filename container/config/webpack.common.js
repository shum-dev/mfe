module.exports = {
  module: {
    rules: [
      // trinspile rules
      {
        // all .js files will be processed by babel
        test: /\.m?js$/,
        // exclude node_modules
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // "@babel/preset-react" allows to process all .jsx files - react related code
            // "@babel/preset-env" enables new syntax as ES2016 ES2017 etc.
            presets: ["@babel/preset-react", "@babel/preset-env"],
            // "@babel/plugin-transform-runtime" enables different feature inside our browser 
            // such as async/await syntax etc.
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
