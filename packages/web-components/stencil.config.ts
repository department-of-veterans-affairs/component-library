import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import url from 'postcss-url';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'component-library',
  globalStyle: 'src/global/base.css',
  plugins: [
    postcss({
      plugins: [url({ url: 'inline' })],
    }),
  ],
  // This is for IE11 support
  // https://stenciljs.com/docs/config-extras
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
    reactOutputTarget({
      componentCorePackage: '../dist/types',
      proxiesFile: './react-bindings/index.ts',
      includeDefineCustomElements: false,
    }),
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
