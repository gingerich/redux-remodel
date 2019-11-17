import path from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import generatePackageJson from 'rollup-plugin-generate-package-json'

import pkg from './package.json'

const config = {
  input: 'src/index.js',
  output: [
    {
      dir: 'dist',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      dir: 'dist',
      file: pkg.module,
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
    // generatePackageJson({
    //   baseContents: ({
    //     ...pkg,
    //     private: undefined,
    //     scripts: undefined,
    //     main: path.basename(pkg.main),
    //     module: path.basename(pkg.module),
    //     files: ['./**/*.js']
    //   })
    // })
  ]
}

export default [
  config,
  require('./rollup.config.react')
]
