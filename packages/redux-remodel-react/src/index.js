import React, { useReducer, useMemo, useContext, useState } from 'react';
import bindActionCreators from './bindActionCreators';

export function makeStore(useModel = useState, defaultValue) {
  // Make a context for the store
  const Context = React.createContext(defaultValue);

  // Make a provider that takes an initialState
  const Provider = ({ initialState, children }) => {
    // Make a new state instance (could even use immer here!)
    const model = useModel(initialState);

    const deps = Array.isArray(model) ? model : [model];

    // Memoize the context value to update when the state does
    const contextValue = useMemo(() => model, [model]);

    // Provide the store to children
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  // A hook to consume the store
  const useStore = () => useContext(Context);

  // A HoC to map a store into component props
  const withStore = (
    mapper = store => ({ store })
  ) => WrappedComponent => props => {
    const store = useStore();
    const storeProps = useMemo(() => mapper(store, props), [store, props]);
    return <WrappedComponent {...storeProps} {...props} />;
  };

  return { Provider, useStore, withStore };
}

export function useModel(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, reducer);

  useMemo(() => {
    Object.assign(dispatch, bindActionCreators(reducer.actions, dispatch));
  }, [reducer.actions]);

  return [state, dispatch];
}
