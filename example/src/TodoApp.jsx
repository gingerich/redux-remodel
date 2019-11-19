import React from "react";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TodoInput } from "./TodoInput";
import Store, { useFetchUserTodos, useSetAppView } from "./store";
import { ALL_TODOS } from "./constants";

import "todomvc-app-css/index.css";

export const App = ({ userId, view = ALL_TODOS }) => {
  useSetAppView(view)
  useFetchUserTodos(userId);
  return <TodoApp />;
};

const mapStoreToProps = ([state, dispatch]) => ({
  ...state,
  ...dispatch // spread actions into props
});

export const TodoApp = Store.withStore(mapStoreToProps)(
  class TodoApp extends React.Component {
    state = {
      editing: null
    };

    toggleAll = event => {
      const checked = event.target.checked;
      this.props.toggleAll(checked);
    };

    edit = todo => {
      this.setState({ editing: todo.id });
    };

    save = (todo, newTitle) => {
      this.props.save({ ...todo, title: newTitle });
      this.setState({ editing: null });
    };

    cancel = () => {
      this.setState({ editing: null });
    };

    render() {
      const { visibleTodos, active, addTodo } = this.props;

      const todoItems = visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={() => this.edit(todo)}
          editing={this.state.editing === todo.id}
          onSave={newTitle => this.save(todo, newTitle)}
          onCancel={this.cancel}
        />
      ));

      return (
        <div>
          <header className="header">
            <h1>Todos</h1>
            <TodoInput onSave={addTodo} />
          </header>
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={this.props.toggleAll}
              checked={active.length === 0}
            />
            <label htmlFor="toggle-all" />
            <ul className="todo-list">{todoItems}</ul>
          </section>
          <TodoFooter nowShowing={this.props.view} />
        </div>
      );
    }
  }
);
