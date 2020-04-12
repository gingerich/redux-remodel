import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoFooter } from './TodoFooter';
import { TodoInput } from './TodoInput';
import Store, { useSetAppView, useFetchUserTodos } from '../store';
import { ALL_TODOS } from '../constants';

import 'todomvc-app-css/index.css';

export default ({ userId, view = ALL_TODOS }) => {
  useSetAppView(view);
  useFetchUserTodos(userId);
  return <TodoApp />;
};

export const TodoApp = () => {
  const [state, setState] = useState({ editing: null });
  const [{ active, visibleTodos }, dispatch] = Store.useStore();

  const toggleAll = (event) => {
    const { checked } = event.target;
    dispatch.toggleAll(checked);
  };

  const edit = (todo) => {
    setState({ editing: todo.id });
  };

  const save = (todo, newTitle) => {
    dispatch.save({ ...todo, title: newTitle });
    setState({ editing: null });
  };

  const cancel = () => {
    setState({ editing: null });
  };

  const todoItems = visibleTodos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onEdit={() => edit(todo)}
      editing={state.editing === todo.id}
      onSave={(newTitle) => save(todo, newTitle)}
      onCancel={cancel}
    />
  ));

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <TodoInput onSave={dispatch.addTodo} />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={active.length === 0}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">{todoItems}</ul>
      </section>
      <TodoFooter />
    </div>
  );
};
