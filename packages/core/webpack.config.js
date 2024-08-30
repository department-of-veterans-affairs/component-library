const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/main.js'],
  target: ['web', 'es5'],
  output: {
    publicPath: '',
    path: __dirname + '/dist',
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
  resolve: {
    alias: {
      '@department-of-veterans-affairs/web-components/react-bindings':
        path.resolve(__dirname, '../web-components/'),
      '@department-of-veterans-affairs/web-components': path.resolve(
        __dirname,
        '../web-components/',
      ),
      '@department-of-veterans-affairs/react-components': path.resolve(
        __dirname,
        '../react-components/',
      ),
    },
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
        },
        {
          from: 'react-bindings/**/*',
          to: './',
          context: path.resolve(__dirname, '../', 'web-components'),
        },
        {
          from: 'components/**/*',
          to: './',
          context: path.resolve(__dirname, '../', 'web-components/dist'),
        },
        {
          from: 'assets/**/*',
          to: './',
          context: path.resolve(__dirname, '../', 'web-components/dist'),
        },
        {
          from: 'img/**/*',
          to: './',
          context: path.resolve(__dirname, '../', 'web-components/dist'),
        },
        {
          from: '*',
          to: './components/types',
          context: path.resolve(__dirname, '../', 'web-components/dist/types'),
        },
      ],
    }),
  ],
};
