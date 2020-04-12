const eslint = require('@neutrinojs/eslint');
const jest = require('@neutrinojs/jest');
const library = require('@neutrinojs/library');

module.exports = {
  options: {
    root: __dirname,
    output: 'dist'
  },
  use: [
    eslint({
      eslint: {
        baseConfig: {
          env: {
            browser: true,
            jest: true
          },
          rules: {
            'no-underscore-dangle': ['error', { allowAfterThis: true }]
          }
        }
      }
    }),
    library({
      name: 'redux-remodel'
    }),
    jest({
      testRegex: undefined // force to use jest default value
      // collectCoverageFrom: [
      //   'packages/**/*.{js,jsx}',
      //   '!**/build/**',
      //   '!**/node_modules/**',
      // ]
    }),
    /* Prettier */
    (neutrino) => {
      const eslintOptions = neutrino.config.module
        .rule('lint')
        .use('eslint')
        .get('options');

      eslintOptions.baseConfig.extends.push('plugin:prettier/recommended');

      neutrino.register('prettierrc', () => {
        return {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none'
        };
      });
    }
  ]
};
