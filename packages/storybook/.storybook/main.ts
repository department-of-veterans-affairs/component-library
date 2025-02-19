import { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration as WebpackConfiguration } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
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
  webpackFinal: async (config: WebpackConfiguration) => {
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

    // Initialize plugins array if it doesn't exist
    if (!config.plugins) {
      config.plugins = [];
    }

    // Add rule to handle HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader'],
    });

    // Add rule to handle license and other text files
    config.module.rules.push({
      test: /\.(txt|md|license)$/i,
      type: 'asset/source',
    });

    // Add rule to silence log files
    config.module.rules.push({
      test: /\.log$/,
      use: 'null-loader',
      include: path.resolve(__dirname, '../')
    });

    // Add TypeScript handling for both .ts and .tsx files
    // Exclude node_modules except packages that start with @department-of-veterans-affairs/
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, '../tsconfig.json')
          }
        }
      ],
      exclude: /node_modules\/(?!@department-of-veterans-affairs)/
    });

    // Copies fonts from mobile-assets to storybook static folder
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: '../../node_modules/@department-of-veterans-affairs/mobile-assets/fonts',
            to: 'fonts',
          },
        ],
      }),
    )

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
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  core: {
    builder: '@storybook/builder-webpack5',
    disableWhatsNewNotifications: true,
  },
  docs: {
    autodocs: true
  }
};

export default config;