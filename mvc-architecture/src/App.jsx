import { useEffect, useState } from 'react';
import './App.css';
import TodoView from './view/TodoView';
import * as controller from './controller/todoController';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        controller.loadTodos(setTodos);
    }, []);

    return (
        <TodoView
            todos={todos}
            title={title}
            onTitleChange={setTitle}
            onAdd={() => controller.createTodo(title, setTodos, setTitle)}
            onDelete={id => controller.removeTodo(id, setTodos)}
        />
    );
}

export default App;
