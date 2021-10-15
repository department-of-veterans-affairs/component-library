const path = require("path");

module.exports = {
  entry: ["./src/main.js"],
  output: {
    path: __dirname + "/dist",
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@department-of-veterans-affairs/web-components": path.resolve(
        __dirname,
        "../web-components/"
      ),
      "@department-of-veterans-affairs/react-components": path.resolve(
        __dirname,
        "../react-components/"
      ),
    },
  },
  // plugins: []
};
