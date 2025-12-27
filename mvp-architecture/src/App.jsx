import { useEffect, useState } from 'react';
import './App.css';
import TodoView from './view/TodoView';
import TodoPresenter from './presenter/todoPresenter';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    const presenter = new TodoPresenter({
        todos,
        setTodos,
        title,
        setTitle
    });

    useEffect(() => {
        presenter.loadTodos();
        presenter.subscribeRealtime();

        return () => {
            presenter.unsubscribeRealtime();
        };
    }, []);

    return (
        <TodoView
            todos={todos}
            title={title}
            onTitleChange={presenter.onTitleChange}
            onAdd={presenter.onAdd}
            onDelete={presenter.onDelete}
        />
    );
}

export default App;
