const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './config/babel.config.js',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@department-of-veterans-affairs/web-components/react-bindings':
        '../web-components/',
      '@department-of-veterans-affairs/web-components': '../web-components/',
    },
    extensions: ['.jsx', '...'],
  },
};
