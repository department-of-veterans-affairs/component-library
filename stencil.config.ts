import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import url from 'postcss-url';

export const config: Config = {
  namespace: 'component-library',
  globalStyle: 'src/global/variables.css',
  plugins: [
    postcss({
      plugins: [url({ url: 'inline' })],
    }),
  ],
  buildEs5: 'prod',
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
