import { useEffect } from 'react'
import uuid from 'uuid/v4'
import { createModel, select } from 'redux-remodel'
import { useModel } from 'redux-remodel/dist/react'
import { makeStore } from './makeStore'

// Create a plain old reducer function from a declarative schema
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

// Compose reducer functions wih slices
const model = createModel(
  {},
  {
    slices: {
      todos
    },
    computed: {
      active: select(todos => todos.filter(t => !t.completed), 'todos'),
      completed: select(todos => todos.filter(t => t.completed), 'todos')
    },
    actions: {
      switchView: (state, { payload: view }) => {
        state.view = view
      }
    }
  }
)

// Create a hook for our model. Think useReducer()
export function useTodos(initialState) {
  return useModel(model, initialState)
}

// A store is a stateful instance of the model
// You can inject a store into your app with <Store.Provider>
// As you'd expect each <Store.Provider> provides a new store instance to its children
export const Store = makeStore(useTodos, [])

// Add async operations by composing hooks
export function useFetchUserTodos(userId) {
  const [state, dispatch] = Store.useStore()

  useEffect(() => {
    const fetchTodos = async () => {
      // const todos = await axios.get(`/todos/${userId}`)
      const todos = [{ id: '123', title: 'hello' }]
      setTimeout(() => {
        dispatch.setTodos(todos)
      }, 1000)
    }
    fetchTodos()
  }, [userId])

  return [state, dispatch]
}
