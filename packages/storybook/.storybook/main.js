const path = require('path');

module.exports = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html'
  ],

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // This is so the docs page for each component can populate the args table.
    // The propTypes are stripped out in the built version, so we need to use
    // the source files
    config.resolve.alias['@department-of-veterans-affairs/component-library$'] =
      path.resolve(__dirname, '../../react-components/src');

    // Return the altered config
    return config;
  },
};
