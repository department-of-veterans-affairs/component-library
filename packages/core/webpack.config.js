const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  optimization: {
    usedExports: true,
  },
  entry: ['./src/main.js'],
  target: ['web', 'es5'],
  output: {
    clean: true,
    publicPath: '',
    path: __dirname + '/dist',
    filename: 'app.bundle.js',
    library: {
      name: 'component-library',
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // This is meant to allow for a gentle transition to the new named import strategy
    new CopyPlugin({
      patterns: [
        {
          from: '[\\w]*!(index).js',
          to: '../',
          context: path.resolve(__dirname, '../', 'react-components'),
          globOptions: {
            ignore: ['**/webpack.config.js'],
          },
        },
        {
          from: 'react-bindings/**/*',
          to: './',
          context: path.resolve(__dirname, '../', 'web-components'),
        },
      ],
    }),
    // Without this, Stencil lazy loading chunks are created and causes the bundle to crash
    // when it doesn't find them.
    // See https://github.com/ionic-team/stencil/issues/1882
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: ['react', 'react-dom'],
};
