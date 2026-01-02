import { supabase } from '../config/supabaseClient.js';

export async function getTodos() {
    const { data } = await supabase
        .from('todos')
        .select('*')
        .order('id');
    return data;
}

export async function addTodo(title) {
    await supabase.from('todos').insert({ title });
}

export async function deleteTodo(id) {
    await supabase.from('todos').delete().eq('id', id);
}