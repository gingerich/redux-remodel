import React, { useReducer, useMemo, useContext, useState } from 'react';
import bindActionCreators from './bindActionCreators';

export function makeStore(useModel = useState, defaultValue) {
  // Make a context for the store
  const Context = React.createContext(defaultValue);

  // Make a provider that takes an initialState
  const Provider = React.memo(({ initialState, children }) => {
    // Make a new state instance (could even use immer here!)
    const model = useModel(initialState);

    const deps = Array.isArray(model) ? model : [model];

    // Memoize the context value to update when the state does
    const contextValue = useMemo(() => model, deps);

    // Provide the store to children
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  });

  // A hook to consume the store
  const useStore = () => useContext(Context);

  const defaultMapper = (store) => ({ store });

  // A HoC to map a store into component props
  const withStore = (mapper = defaultMapper) => (WrappedComponent) =>
    React.memo((props) => {
      const store = useStore();
      const storeProps = useMemo(() => mapper(store, props), [store, props]);
      return <WrappedComponent {...storeProps} {...props} />;
    });

  return { Provider, useStore, withStore };
}

export function useModel(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, reducer);

  useMemo(() => {
    const boundActionCreators = bindActionCreators(reducer.actions, dispatch);
    Object.assign(dispatch, boundActionCreators);
  }, [reducer.actions]);

  return [state, dispatch];
}
