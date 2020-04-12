# redux-remodel

Create reducers from simple declarative data models

The motivation behind redux-toolkit is to enable simple intuitive reducer composition and avoid boilerplate code. A reducer is a simple functional building block which makes it endlessly composable. However, handwriting traditional redux reducers can be verbose and cumbersome. Instead redux-remodel lets you declare a reducer as a model with actions, computed properties, and sub-models (i.e. slices). The resulting reducer function is also decorated with action creators for convenient action dispatching.

Under the hood redux-remodel uses [Immer](https://npmjs.com/immer) so you can write mutative actions and still preserve reducer purity and state immutability. Using Immer also enables structural sharing which reduces the memory intensity of traditional redux reducers. Action creators are built with `createAction()` from [@reduxjs/toolkit](https://redux-toolkit.js.org/) and computed properties rely on the [Reselect](https://npmjs.com/reselect) utility.

[![NPM](https://img.shields.io/npm/v/redux-remodel.svg)](https://www.npmjs.com/package/redux-remodel) [![Build Status](https://travis-ci.com/gingerich/redux-remodel.svg?branch=master)](https://travis-ci.com/gingerich/redux-remodel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-remodel
```

## Usage

Define a todos model

```js
const todos = {
  actions: {
    addTodo: (todos, { payload }) => {
      todos.push({ id: todos.length + 1, title: payload });
    },
    toggleTodo: (todos, { payload }) => {
      const todo = todos.find((t) => t.id === payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
};
```

Declare a new model by composing todos

```js
import { createModel } from 'redux-remodel';

const initialState = { view: 'all' };

const app = createModel(initialState, {
  slices: {
    todos: createModel([], todos)
  },
  actions: {
    setView: (state, { payload: view }) => {
      state.view = view;
    }
  },
  computed: {
    active: ({ todos }) => todos.filter((t) => !t.completed),
    completed: ({ todos }) => todos.filter((t) => t.completed),
    visibleTodos: (state) => {
      switch (state.view) {
        case 'ACTIVE':
          return state.active;
        case 'COMPLETED':
          return state.completed;
        default:
          return state.todos;
      }
    }
  }
});
```

Use like a reducer function

```js
let state;
state = app(state, { type: 'addTodo', payload: 'My Todo' });

console.log(state);
/*
{
  view: 'all',
  todos: [{ id: 1, title: 'My Todo' }],
  active: [{ id: 1, title: 'My Todo' }],
  completed: []
}
*/
```

The returned reducer is decorated with action creators

```js
app(state, app.actions.addTodo('My Todo'))
```

## License

MIT © [gingerich](https://github.com/gingerich)
