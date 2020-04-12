import React, { useState } from 'react';
import { ENTER_KEY } from '../constants';

export const TodoInput = ({ onSave }) => {
  const [state, setState] = useState({ input: '' });

  const handleChange = (event) => {
    setState({ input: event.target.value });
  };

  const handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = state.input.trim();

    if (val) {
      onSave(val);
      setState({ input: '' });
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={state.input}
      onKeyDown={handleNewTodoKeyDown}
      onChange={handleChange}
      autoFocus
    />
  );
};
