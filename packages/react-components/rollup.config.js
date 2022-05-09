import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'es',
    },
  ],
  plugins: [
    nodeResolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    babel({
      // babelHelpers: 'runtime',
      configFile: './config/babel.config.js',
      exclude: /node_modules/,
    }),
    commonjs({
      // include: /node_modules/,
      transformMixedEsModules: true,
    }),
    json(),
    terser(),
    visualizer({ gzipSize: true }),
  ],
  external: [
    // /@babel\/runtime/,
    'react',
    'react-dom',
    'i18next',
    'i18next-browser-languagedetector',
    '@department-of-veterans-affairs/web-components',
  ],
};
