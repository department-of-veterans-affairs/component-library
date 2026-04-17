import type { StorybookConfig } from '@storybook/react-webpack5';
import { dirname, join } from 'path';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx)',
    '../@(src|stories)/**/*.mdx',
  ],
  staticDirs: [
    '../public',
    // To test mobile Storybook composition locally:
    //   Note: Assumes va-mobile-library is in the same parent directory as component-library
    //   1. Build the mobile Storybook in va-mobile-library (yarn storybook:build)
    //   2. Uncomment the staticDirs entry below
    //   3. Change the va-mobile ref url below to `/storybook-mobile`
    // {
    //   from: '../../../../va-mobile-library/packages/components/storybook-static',
    //   to: '/storybook-mobile',
    // },
  ],

  addons: [
    '@vueless/storybook-dark-mode',
    {
      name: getAbsolutePath('@storybook/addon-docs'),
    },
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
  ],

  webpackFinal: async (config: any) => {
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
      title: 'Mobile Components',
      url: 'https://dev-design.va.gov/storybook-mobile',
      expanded: true,
    },
  },
};

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
