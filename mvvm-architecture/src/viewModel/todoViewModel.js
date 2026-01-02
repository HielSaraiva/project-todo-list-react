import { useState, useEffect } from 'react';
import * as todoModel from '../model/todoModel.js';

export function useTodoViewModel() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    async function loadTodos() {
        const data = await todoModel.getTodos();
        setTodos(data || []);
    }

    async function handleAdd() {
        if (!title.trim()) return;
        await todoModel.addTodo(title);
        setTitle('');
        loadTodos();
    }

    async function handleDelete(id) {
        await todoModel.deleteTodo(id);
        loadTodos();
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTodos();
    }, []);

    return {
        todos,
        title,
        setTitle,
        handleAdd,
        handleDelete
    };
}
