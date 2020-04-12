import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Store from '../store';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

export const TodoFooter = withRouter(({ match }) => {
	const [ { active, completed, view }, { clearCompleted } ] = Store.useStore();
	const { userId } = match.params;

	return (
		<footer className="footer">
			<span className="todo-count">
				<strong>{active.length}</strong> items left
			</span>
			<ul className="filters">
				<li>
					<a href={`#/${userId}/`} className={classNames({ selected: view === ALL_TODOS })}>
						All
					</a>
				</li>{' '}
				<li>
					<a
						href={`#/${userId}/active`}
						className={classNames({
							selected: view === ACTIVE_TODOS
						})}
					>
						Active
					</a>
				</li>{' '}
				<li>
					<a
						href={`#/${userId}/completed`}
						className={classNames({
							selected: view === COMPLETED_TODOS
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
