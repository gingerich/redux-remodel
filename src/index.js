import { useReducer, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { createAction, createSelector } from '@reduxjs/toolkit'
import reduceReducers from 'reduce-reducers'
import purify, { original } from 'immer'

const withActions = (reducer, actions) => {
  return Object.assign(reducer, { actions })
}

const originalize = r => (state, action) => r(original(state) || state, action)

export function createModel(initialState, ...reducers) {
  if (Array.isArray(reducers[0])) {
    reducers = reducers[0]
  }

  if (typeof reducers[0] === 'object') {
    const schema = reducers.shift()
    const slices = createSliced(schema.slices || {})
    const reducer = createReducer(schema.actions || {})
    const computed = createComputed(schema.computed || {})
    reducers = [slices, reducer, computed, ...reducers]
    reducers.actions = { ...reducer.actions, ...slices.actions }
    return createModel(initialState, reducers)
  }

  const purifiedReducers = reducers.map(reducer =>
    originalize(purify(reducer))
  )

  const reducer = reduceReducers(initialState, ...purifiedReducers)

  const { actions = {} } = reducers

  return withActions(
    (state = initialState, action) => reducer(state, action),
    actions
  )
}

export function createSliced(slices) {
  const actionCreators = Object.values(slices).reduce(
    (result, { actions = {} }) => ({ ...result, ...actions }),
    {}
  )

  return withActions((state, action) => {
    Object.entries(slices).forEach(([key, reducer]) => {
      const newState = reducer(original(state[key]), action)
      if (newState !== state[key]) {
        state[key] = newState
      }
    })
    return state
  }, actionCreators)
}

export function createReducer(actions) {
  const actionCreators = Object.keys(actions).reduce((result, key) => {
    result[key] = createAction(key)
    return result
  }, {})

  return withActions((state, action = {}) => {
    const reducer = actions[action.type]
    if (!reducer) {
      return state
    }
    return reducer(state, action)
  }, actionCreators)
}

export function createComputed(properties) {
  const selectors = Object.entries(properties).reduce(
    (result, [key, reducer]) => {
      const selector = makeSelector(reducer.selector)
      result[key] = createSelector(
        selector,
        reducer
      )
      return result
    },
    {}
  )

  return state => {
    if (!Object.keys(selectors).length) {
      return state
    }

    const computed = Object.entries(selectors).reduce(
      (result, [key, selector]) => {
        const value = selector(state)
        if (value !== state[key]) {
          result[key] = value
        }
        return result
      },
      {}
    )

    // return { ...state, ...computed }
    return Object.assign(state, computed)
  }
}

const makeSelector = selector => {
  if (typeof selector === 'function') {
    return selector
  }
  if (typeof selector === 'string') {
    return state => state[selector]
  }
  return state => state
}

export const select = (reducer, selector) =>
  Object.assign(reducer, { selector })

export function useModel(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, reducer)

  useMemo(() => {
    Object.assign(dispatch, bindActionCreators(reducer.actions, dispatch))
  }, [reducer.actions])

  return [state, dispatch]
}
