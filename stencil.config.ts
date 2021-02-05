import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import url from 'postcss-url';

export const config: Config = {
  namespace: 'component-library',
  plugins: [
    postcss({
      plugins: [url({ url: 'inline' })],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
