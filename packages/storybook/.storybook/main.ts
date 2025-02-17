import { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration as WebpackConfig } from 'webpack';
const path = require('path');

const config: StorybookConfig = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-links', 
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-react-native-web',
  ],
  webpackFinal: async (config: WebpackConfig) => {
    // Initialize module if it doesn't exist
    if (!config.module) {
      config.module = {
        rules: []
      };
    }

    // Initialize rules if they don't exist
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Add rule to silence log files
    config.module.rules.push({
      test: /\.log$/,
      use: 'null-loader',
      include: path.resolve(__dirname, '../')
    });

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });

    config.module.rules.push({
      test: /\.stories\.[tj]sx?$/,
      use: [
        {
          loader: require.resolve("@storybook/source-loader"),
          options: {
            sourceLoaderOptions: {
              injectStoryParameters: false
            }
          }
        },
      ],
      enforce: "pre",
    });

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  refs: {
    "va-mobile": {
      title: "VA Mobile Design System",
      url: "https://department-of-veterans-affairs.github.io/va-mobile-library",
      expanded: false
    }
  },
  core: {
    builder: '@storybook/builder-webpack5',
    disableWhatsNewNotifications: true,
  },
  options: { builder: { useSWC: true } }, // improves build performance
  docs: {
    autodocs: true
  }
};

export default config;