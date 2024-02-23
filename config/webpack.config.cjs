const path = require("path");

module.exports = {
  mode: "production",
  entry: "./dist/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "little-pay-api.min.js",
    library: "little-pay-api",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts(x*)?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "config/tsconfig.umd.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
};
