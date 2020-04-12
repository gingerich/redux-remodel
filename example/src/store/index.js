import { useEffect } from 'react';
import { useModel } from 'redux-remodel-react';
import { makeStore } from '../makeStore';
import app from './app';

// Create a hook for our model. Think useReducer()
export function useTodos(initialState) {
  return useModel(app, initialState);
}

// A store is a stateful instance of the model
// You can inject a store into your app with <Store.Provider>
// As you'd expect each <Store.Provider> provides a new store instance to its children
export const Store = makeStore(useTodos, {});

export default Store;

// Add async operations by composing hooks
export function useFetchUserTodos(userId) {
  const [state, dispatch] = Store.useStore();

  useEffect(() => {
    const fetchTodos = async () => {
      // const todos = await axios.get(`/todos/${userId}`)
      const todos = [{ id: '123', title: 'hello' }];
      setTimeout(() => {
        dispatch.setTodos(todos);
      }, 1000);
    };
    fetchTodos();
  }, [dispatch, userId]);

  return state;
}

// Simple utility hook to set view
export function useSetAppView(view) {
  const [, actions] = Store.useStore();
  useEffect(() => {
    actions.setView(view);
  }, [actions, view]);
}
