const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const external = require('rollup-plugin-peer-deps-external')
const resolve = require('rollup-plugin-node-resolve')
const url = require('rollup-plugin-url')

module.exports = {
  input: `src/react/index.js`,
  output: [
    {
      file: `dist/react.js`,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: `dist/react.es.js`,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs()
  ]
}
