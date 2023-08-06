import { Database } from 'https://deno.land/x/aloedb@0.9.0/mod.ts'
import { Handlers, PageProps } from "$fresh/server.ts";
import { HtmlEditor } from "../components/HtmlEditor.tsx";
import { useState } from "preact/hooks";

const dbPath = "../data/todo.json";

type TodoItem = {
  text: string;
  isComplete: boolean;
}

type PageData = {
    todos: TodoItem[];
    newTodo: string;
}

const db = new Database<TodoItem>('./data/todo.json');

const getAllTodos = async () => {
	const todos = await db.findMany();
	return { todos, newTodo: "" } as PageData;
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const result = await getAllTodos();

    return ctx.render(result);
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const todo = form.get("newTodo")?.toString() || "";
    if (todo) {
      await db.insertOne({ text: todo, isComplete: false });
    }

    const result = await getAllTodos();
    return ctx.render(result);
    
  }
};

export default function Page({ data }: PageProps<PageData>) {
  const { todos, newTodo } = data;
  
  return (<>
    <div>
      <form method="Post">
        <HtmlEditor html={newTodo} name="newTodo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => <li key={todo.text}>{todo.text}</li>)}
      </ul>
    </div></>
  );
}