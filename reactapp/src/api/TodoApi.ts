import axios from "axios";
import { Todo } from "../models/Todo";

export async function GetTodos(listId:number | null){
	let url = listId?`/api/todos/?listId=${listId}`:"/api/todos/"
	return (await axios.get<Todo[]>(url)).data;
}

export async function UpdateTodo(todo: Todo){
	return (await axios.put(`/api/todos/${todo.id}`,todo)).data;
}

export async function AddTodo(todo: Todo) {
	return (await axios.post("/api/todos",todo))
}

export async function RemoveTodo(todo: Todo){
	await axios.delete(`/api/todos/${todo.id}`)
}