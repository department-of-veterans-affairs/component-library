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
        path.resolve(__dirname, '../web-components/'),
      '@department-of-veterans-affairs/web-components': path.resolve(
        __dirname,
        '../web-components/',
      ),
    },
    extensions: ['.jsx', '...'],
  },
};
