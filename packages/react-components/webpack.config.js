const path = require('path');

module.exports = {
  devtool: 'source-map',
  optimization: {
    usedExports: true,
  },
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'react-components',
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [
    '@department-of-veterans-affairs/web-components/react-bindings',
    'i18next',
    'react',
    'react-dom',
  ],
};
