import * as model from '../model/todoModel';

// REST
export async function loadTodos(setTodos) {
    const todos = await model.getTodos();
    setTodos(todos);
}

export async function createTodo(title, setTodos, setTitle) {
    if (!title) return;
    await model.addTodo(title);
    setTitle('');
    loadTodos(setTodos);
}

export async function removeTodo(id, setTodos) {
    await model.deleteTodo(id);
    loadTodos(setTodos);
}
