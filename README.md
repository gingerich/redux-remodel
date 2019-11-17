# redux-remodel
Create reducers from simple declarative data models

[![NPM](https://img.shields.io/npm/v/redux-remodel.svg)](https://www.npmjs.com/package/redux-remodel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-remodel
```

To ensure we don't bundle duplicate React instances in the example app we'll link to the root level node_modules
```bash
cd example && npm link ../node_module/react
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'redux-remodel'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [gingerich](https://github.com/gingerich)
