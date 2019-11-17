import React from "react";
import { ENTER_KEY } from "./constants";

export class TodoInput extends React.Component {
  state = {
    input: ""
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.input.trim();

    if (val) {
      this.props.onSave(val);
      this.setState({ input: "" });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.input}
        onKeyDown={this.handleNewTodoKeyDown}
        onChange={this.handleChange}
        autoFocus={true}
      />
    );
  }
}
