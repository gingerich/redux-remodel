import React from "react";
import classNames from "classnames";
import Store from "./store";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";

const mapStoreToProps = ([, dispatch], { todo }) => ({
  onToggle: () => dispatch.toggleTodo(todo),
  onDestroy: () => dispatch.destroy(todo)
});

export const TodoItem = Store.withStore(mapStoreToProps)(
  class TodoItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editText: props.todo.title
      };
    }

    handleSubmit = () => {
      var val = this.state.editText.trim();
      if (val) {
        this.props.onSave(val);
        this.setState({ editText: val });
      } else {
        this.props.onDestroy();
      }
    };

    handleEdit = () => {
      this.props.onEdit();
      this.setState({ editText: this.props.todo.title });
    };

    handleKeyDown = event => {
      if (event.which === ESCAPE_KEY) {
        this.setState({ editText: this.props.todo.title });
        this.props.onCancel(event);
      } else if (event.which === ENTER_KEY) {
        this.handleSubmit(event);
      }
    };

    handleChange = event => {
      if (this.props.editing) {
        this.setState({ editText: event.target.value });
      }
    };

    render() {
      const { todo, editing, onToggle, onDestroy } = this.props;

      return (
        <li
          className={classNames({
            completed: todo.completed,
            editing: editing
          })}
        >
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={onToggle}
            />
            <label onDoubleClick={this.handleEdit}>{todo.title}</label>
            <button className="destroy" onClick={onDestroy} />
          </div>
          <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </li>
      );
    }
  }
);
