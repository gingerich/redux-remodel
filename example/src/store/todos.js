import uuid from 'uuid/v4';
import { createModel } from 'redux-remodel';

// Create a plain old reducer function from a declarative schema
export const todos = {
  actions: {
    addTodo: (todos, { payload }) => {
      todos.push({ id: uuid(), title: payload });
    },
    setTodos: (todos, { payload }) => {
      return payload;
    },
    toggleTodo: (todos, { payload }) => {
      const todo = todos.find((t) => t.id === payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleAll: (todos, { payload: completed }) => {
      todos.forEach((todo) => void (todo.completed = completed));
    },
    save: (todos, { payload }) => {
      const todo = todos.find((t) => t.id === payload.id);
      if (todo) {
        todo.title = payload.title;
      }
    },
    clearCompleted: (todos) => {
      return todos.filter((t) => !t.completed);
    },
    destroy: (todos, { payload: todo }) => {
      return todos.filter((t) => t.id !== todo.id);
    }
  }
};

export default createModel([], todos);
