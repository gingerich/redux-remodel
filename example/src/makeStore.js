import React, { useContext, useState, useMemo } from "react";

export function makeStore(useModel = useState, defaultValue) {
  // Make a context for the store
  const context = React.createContext(defaultValue);

  // Make a provider that takes an initialState
  const Provider = ({ initialState, children }) => {
    // Make a new state instance (could even use immer here!)
    const model = useModel(initialState);

    const deps = Array.isArray(model) ? model : [model];

    // Memoize the context value to update when the state does
    const contextValue = useMemo(() => model, deps);

    // Provide the store to children
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  // A hook to help consume the store
  const useStore = () => useContext(context);

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
