import TodoView from './view/TodoView';
import { useTodoViewModel } from './viewmodel/todoViewModel';

export default function App() {
    const {
        todos,
        title,
        setTitle,
        handleAdd,
        handleDelete
    } = useTodoViewModel();

    return (
        <TodoView
            todos={todos}
            title={title}
            onTitleChange={setTitle}
            onAdd={handleAdd}
            onDelete={handleDelete}
        />
    );
}
