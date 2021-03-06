const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => ({
  devtool: argv.mode === "production" ? false : "inline-source-map",

  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: "babel-loader",
      // },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },

      {
        test: /\.css$/,
        loader: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(svg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
    ],
  },
  entry: {
    ui: path.resolve(__dirname, "./src/ui/index.tsx"),
    code: path.resolve(__dirname, "./src/sandbox/code.ts"),
  },
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".esm"] },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/ui/ui.html",
      filename: "ui.html",
      inlineSource: ".(js)$",
      chunks: ["ui"],
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
