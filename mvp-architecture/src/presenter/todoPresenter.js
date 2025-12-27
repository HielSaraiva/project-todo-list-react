import * as model from '../model/todoModel';
import { supabase } from '../config/supabaseClient';

export default class TodoPresenter {
    constructor({ todos, setTodos, title, setTitle }) {
        this.todos = todos;
        this.setTodos = setTodos;
        this.title = title;
        this.setTitle = setTitle;

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    async loadTodos() {
        const data = await model.getTodos();
        this.setTodos(data);
    }

    onTitleChange(value) {
        this.setTitle(value);
    }

    async onAdd() {
        if (!this.title.trim()) return;

        await model.addTodo(this.title);
        this.setTitle('');
        this.loadTodos();
    }

    async onDelete(id) {
        await model.deleteTodo(id);
        this.loadTodos();
    }

    subscribeRealtime() {
        this.channel = supabase
            .channel('public:todos')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'todos' },
                () => this.loadTodos()
            )
            .subscribe();
    }

    unsubscribeRealtime() {
        if (this.channel) {
            supabase.removeChannel(this.channel);
        }
    }
}
