import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';

export function useModel(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, reducer);

  useMemo(() => {
    Object.assign(dispatch, bindActionCreators(reducer.actions, dispatch));
  }, [reducer.actions]);

  return [state, dispatch];
}

export default useModel;
