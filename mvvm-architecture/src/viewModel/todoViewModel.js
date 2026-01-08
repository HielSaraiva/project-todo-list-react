import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient.js";

export function useTodoViewModel() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    // Função que busca todos do banco
    async function fetchTodos() {
        const data = await supabase
            .from("todos")
            .select("*")
            .order("id");
        setTodos(data.data ?? []);
    }

    async function handleAdd() {
        if (!title.trim()) return;
        await supabase.from("todos").insert({ title });
        setTitle("");
    }

    async function handleDelete(id) {
        await supabase.from("todos").delete().eq("id", id);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTodos();

        const subscription = supabase
            .channel("realtime-todos")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "todos" },
                (payload) => {
                    setTodos((prev) => [...prev, payload.new]);
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "todos" },
                (payload) => {
                    setTodos((prev) =>
                        prev.filter((todo) => todo.id !== payload.old.id)
                    );
                }
            )
            .subscribe();
        
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return {
        todos,
        title,
        setTitle,
        handleAdd,
        handleDelete,
    };
}
