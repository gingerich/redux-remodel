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

```jsx
import { createModel } from 'redux-remodel'

const uuid = () => Math.round(Math.random()*10000)

const todos = {
  actions: {
    addTodo: (todos, { payload }) => {
      todos.push({ id: uuid(), title: payload })
    },
    setTodos: (todos, { payload }) => {
      return payload
    },
    toggleTodo: (todos, { payload }) => {
      const todo = todos.find(t => t.id === payload.id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    toggleAll: (todos, { payload: completed }) => {
      todos.forEach(todo => void (todo.completed = completed))
    },
    save: (todos, { payload }) => {
      const todo = todos.find(t => t.id === payload.id)
      if (todo) {
        todo.title = payload.title
      }
    },
    clearCompleted: todos => {
      return todos.filter(t => !t.completed)
    },
    destroy: (todos, { payload: todo }) => {
      return todos.filter(t => t.id !== todo.id)
    }
  }
}

const todosReducer = createModel([], todos)
```

Use todos to compose another model

```jsx
import { createModel, select } from 'redux-remodel'

const initialState = { view: 'all' }

const app = createModel(initialState, {
    slices: {
      todos: createModel([], todos)
    },
    computed: {
      active: select(todos => todos.filter(t => !t.completed), 'todos'),
      completed: select(todos => todos.filter(t => t.completed), 'todos')
    },
    actions: {
      setView: (state, { payload: view }) => {
        state.view = view
      }
    }
  }
)
```

Use like a reducer function

```jsx
let state
state = app(state, app.actions.addTodo('My Todo'))

console.log(state)
/*
{
  view: 'all',
  todos: [{ id: 123, title: 'My Todo' }],
  active: [{ id: 123, title: 'My Todo' }],
  completed: []
}
*/
```

## License

MIT © [gingerich](https://github.com/gingerich)
