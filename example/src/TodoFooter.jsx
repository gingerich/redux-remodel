import React from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { Store } from "./todoStore";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";

export const TodoFooter = withRouter(({ nowShowing, match }) => {
  const [{ active, completed }, { clearCompleted }] = Store.useStore();
  const { userId } = match.params;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{active.length}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a
            href={`#/todos/${userId}/`}
            className={classNames({ selected: nowShowing === ALL_TODOS })}
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            href={`#/todos/${userId}/active`}
            className={classNames({
              selected: nowShowing === ACTIVE_TODOS
            })}
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            href={`#/todos/${userId}/completed`}
            className={classNames({
              selected: nowShowing === COMPLETED_TODOS
            })}
          >
            Completed
          </a>
        </li>
      </ul>
      {completed.length > 0 ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
});
