import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import Store from '../store';
import { ENTER_KEY, ESCAPE_KEY } from '../constants';

export const TodoItem = ({ todo, editing, onSave, onEdit, onCancel }) => {
	const [ , dispatch] = Store.useStore();
	const [ state, setState ] = useState({
		editText: todo.title || ''
	});
	const editField = useRef(null);

	const onToggle = () => dispatch.toggleTodo(todo);
	const onDestroy = () => dispatch.destroy(todo);

	const handleSubmit = () => {
		const val = state.editText.trim();
		if (val) {
			onSave(val);
			setState({ editText: val });
		} else {
			onDestroy();
		}
	};

	const handleEdit = () => {
		onEdit();
		setState({ editText: todo.title });
	};

	const handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			setState({ editText: todo.title });
			onCancel(event);
		} else if (event.which === ENTER_KEY) {
			handleSubmit(event);
		}
	};

	const handleChange = (event) => {
		if (editing) {
			setState({ editText: event.target.value });
		}
	};

	return (
		<li
			className={classNames({
				completed: todo.completed,
				editing
			})}
		>
			<div className="view">
				<input className="toggle" type="checkbox" checked={todo.completed} onChange={onToggle} />
				<label onDoubleClick={handleEdit}>{todo.title}</label>
				<button className="destroy" onClick={onDestroy} />
			</div>
			<input
				ref={editField}
				className="edit"
				value={state.editText}
				onBlur={handleSubmit}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
		</li>
	);
};
