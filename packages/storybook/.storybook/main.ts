import type { StorybookConfig } from '@storybook/react-webpack5';
import { dirname, join } from "path";
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const config:StorybookConfig = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx)', '../@(src|stories)/**/*.mdx'],
  staticDirs: ['../public'],

  addons: [{
    name: getAbsolutePath("@storybook/addon-docs"),
  }, getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath("@storybook/addon-webpack5-compiler-babel")],

  webpackFinal: async (config:any) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
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
      expanded: true,
    },
  }
};

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

export default config;
