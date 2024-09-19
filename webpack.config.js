const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    host: "0.0.0.0", // Allows external access
    port: 3000, // The port you specified
    hot: true, // Enables Hot Module Replacement
    historyApiFallback: true,
    allowedHosts: "all", // Allows all hosts (replaces disableHostCheck)
  },
};
