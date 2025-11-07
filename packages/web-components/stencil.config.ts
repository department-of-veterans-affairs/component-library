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
        'src/global/',
      ],
    }),
    postcss({
      plugins: [url({ url: 'inline' })],
    }),
  ],
  // This is for IE11 support
  buildEs5: 'prod',
  // https://stenciljs.com/docs/config-extras
  extras: {
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
    enableImportInjection: true,
  },
  outputTargets: [
    reactOutputTarget({
      outDir: './react-bindings',
      /**
       * give Stencil the import name of the hydrate module
       */
      hydrateModule: '@department-of-veterans-affairs/web-components/hydrate',
      /**
       * tell the server component where it would import the client version of the components
       */
      clientModule: '@department-of-veterans-affairs/web-components/react-bindings'
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets', dest: path.join(__dirname, 'dist/assets') },
        {
          src: 'img/sprite.svg',
          dest: path.join(__dirname, 'dist/img/sprite.svg'),
        },
      ],
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
    },
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
  ],
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    moduleNameMapper: {
      '^.+.(svg)$': 'jest-transformer-svg',
    },
  },
};
