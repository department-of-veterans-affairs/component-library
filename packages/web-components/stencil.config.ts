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
  sourceMap: false,
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
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@department-of-veterans-affairs/web-components/dist/types',
      proxiesFile: './react-bindings/index.ts',
      includeImportCustomElements: false
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets', dest: path.join(__dirname, 'dist/assets') },
        { src: 'img/sprite.svg', dest: path.join(__dirname, 'dist/img/sprite.svg') }
      ]
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
    }
  ],
  testing: {
    moduleNameMapper: {
      '^.+.(svg)$': 'jest-transformer-svg',
    },
  },
};
