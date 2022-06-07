const path = require('path');

module.exports = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        // disabled docs because we need to configure it to allow storysource
        // to display full story in Canvas tab
        // disabling it allows us to continue to use addon-essentials and not have
        // to individually list its addons
        docs: false,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y',
  ],
  core: {
    builder: 'webpack5',
  },

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

    // Return the altered config
    return config;
  },
};
