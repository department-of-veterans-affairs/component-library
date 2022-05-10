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
    extensions: ['.jsx', '...'],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'i18next': 'i18next',
    'i18next-browser-languagedetector': 'i18next-browser-languagedetector',
    '@department-of-veterans-affairs/web-components':
      '@department-of-veterans-affairs/web-components',
  },
};
