function TodoView({ todos, title, onTitleChange, onAdd, onDelete }) {
    return (
        <div className="container">
            <h1>ToDo</h1>

            <input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Nova tarefa"
            />

            <button onClick={onAdd}>Adicionar</button>

            <ul>
                {todos.map((t) => (
                    <li key={t.id}>
                        {t.title}
                        <button onClick={() => onDelete(t.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoView;
