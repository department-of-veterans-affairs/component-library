/* eslint-disable i18next/no-literal-string */
import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { sass } from '@stencil/sass';
import url from 'postcss-url';
import { reactOutputTarget } from '@stencil/react-output-target';
import * as path from 'path';

export const config: Config = {
  namespace: 'component-library',
  globalStyle: 'src/global/main.css',
  plugins: [
    sass({
      includePaths: [
        '../../node_modules/@uswds/uswds/packages/',
        'src/global/'
      ],
    }),
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
      copy: [
        { src: 'assets', dest: path.join(__dirname, 'dist/assets')}
      ]
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    moduleNameMapper: {
      '^.+.(svg)$': 'jest-transformer-svg',
    },
  },
};
