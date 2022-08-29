const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    assetModuleFilename: "images/[hash].[ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
