import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import inject from '@rollup/plugin-inject';

const files = ['gemini.js'];
const external = ['jquery', 'lodash'];
const globals = {
  jquery: '$',
  lodash: '_',
};
const config = [];
const plugins = [
  inject({
    exclude: 'node_modules/**',
    $: 'jquery',
  }),
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
];

for (const file of files) {
  let out = `dist/${file}`;

  config.push({
    input: file,
    output: {
      name: 'Gemini',
      file: out,
      format: 'umd',
      globals,
    },
    external,
    plugins,
  });

  config.push({
    input: file,
    output: {
      name: 'Gemini',
      file: out.replace(/.js$/, '.min.js'),
      format: 'umd',
      globals,
    },
    external,
    plugins: [
      ...plugins,
      terser({
        output: {
          comments() {
            return false;
          },
        },
      }),
    ],
  });
}

export default config;
