import { dirname, join } from "path";
const path = require('path');
module.exports = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../public'],
  addons: [
    {
      name: '@storybook/addon-docs',
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
    getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
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

    config.module.rules.push({
      test: /\.stories\.[tj]sx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            sourceLoaderOptions: {
              injectStoryParameters: false,
            },
          },
        },
      ],
      enforce: 'pre',
    });

    // Return the altered config
    return config;
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  refs: {
    'va-mobile': {
      title: 'VA Mobile Design System',
      url: 'https://department-of-veterans-affairs.github.io/va-mobile-library',
      expanded: 'false',
    },
  },
  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}