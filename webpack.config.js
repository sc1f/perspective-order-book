const PerspectivePlugin = require("@finos/perspective-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: path.resolve(__dirname, "./src/client/main.js"),
  devServer: {
    contentBase: path.resolve(__dirname, "./dist")
  },
  output: {
    filename: "main.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "Perspective Gemini Order Book Demo",
      template: path.resolve(__dirname, "./src/client/index.html")
    }),
    new PerspectivePlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"]
      },
      {
        test: /\.less$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "less-loader" }]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
};