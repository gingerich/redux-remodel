# redux-remodel
Create reducers from simple declarative data models

[![NPM](https://img.shields.io/npm/v/redux-remodel.svg)](https://www.npmjs.com/package/redux-remodel) [![Build Status](https://travis-ci.com/gingerich/redux-remodel.svg?branch=master)](https://travis-ci.com/gingerich/redux-remodel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

## Install

```bash
npm install --save redux-remodel
```

## Usage

Create a todos model

```jsx
import { createModel } from 'redux-remodel'

const uuid = () => Math.round(Math.random()*10000)

const todos = createModel([], {
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
})
```

Use todos to compose another model

```jsx
import { createModel, select } from 'redux-remodel'

const app = createModel({}, {
    slices: {
      todos
    },
    computed: {
      active: select(todos => todos.filter(t => !t.completed), 'todos'),
      completed: select(todos => todos.filter(t => t.completed), 'todos')
    }
  }
)
```

Use like a reducer function

```jsx
let state
state = app(state, app.actions.addTodo('My Todo'))

console.log(state)
// { todos: [{ id: 123, title: 'My Todo' }], active: [{ id: 123, title: 'My Todo' }], completed: [] }
```

## License

MIT © [gingerich](https://github.com/gingerich)
