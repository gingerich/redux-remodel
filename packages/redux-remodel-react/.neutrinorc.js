const library = require('@neutrinojs/library');

module.exports = {
  options: {
    root: __dirname
  },
  use: [
    library({
      name: 'redux-remodel-react',
      target: 'web'
    })
  ]
};
