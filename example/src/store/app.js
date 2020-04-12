import { createModel } from 'redux-remodel';
import todos from './todos';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

// Compose reducer functions wih slices
export const app = {
  slices: {
    todos
  },
  computed: {
    active: ({ todos }) => todos.filter((t) => !t.completed),
    completed: ({ todos }) => todos.filter((t) => t.completed),
    visibleTodos: (state) => {
      switch (state.view) {
        case ACTIVE_TODOS:
          return state.active;
        case COMPLETED_TODOS:
          return state.completed;
        default:
          return state.todos;
      }
    }
  },
  actions: {
    setView: (state, { payload: view }) => {
      state.view = view;
    },
    setLoading(state, loading) {
      state.loading = loading ?? !state.loading;
    }
  }
};

export const initialState = { view: ALL_TODOS, loading: false };

export default createModel(initialState, app);
