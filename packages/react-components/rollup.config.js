import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.esm.js',
    format: 'es',
  },
  plugins: [
    nodeResolve({ extensions: ['.jsx', '.js'] }),
    babel({
      babelHelpers: 'runtime',
      configFile: './config/babel.config.js',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
    terser(),
    visualizer({ gzipSize: true, open: true }),
  ],
  external: [
    /@babel\/runtime/,
    'react',
    'react-dom',
    'i18next',
    'i18next-browser-languagedetector',
  ],
};
