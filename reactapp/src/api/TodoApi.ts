import axios, { AxiosError } from "axios";
import { AppError } from "../models/Error";
import { Todo } from "../models/Todo";


export async function GetTodos(listId:number | null){
	let url = listId?`/api/todos/?listId=${listId}`:"/api/todos/"
	return (await axios.get<Todo[]>(url)).data;
}

export async function UpdateTodo(todo: Todo){
	return (await axios.put(`/api/todos/${todo.id}`,todo)).data;
}

export async function AddTodo(todo: Todo) {
	return (await axios.post<Todo>("/api/todos",todo)).data
}

export async function RemoveTodo(todo: Todo){
	await axios.delete(`/api/todos/${todo.id}`)
}

export async function SetTodoDone(todo:Todo) {
	todo.done = !todo.done;
	await UpdateTodo(todo);
}

export async function SwitchTodoImportant(todo: Todo){
	todo.important = !todo.important;
	await UpdateTodo(todo);
}

export async function DeleteTodos(important?: boolean, done?:boolean, urgent?: boolean, listId?: number){
	var query = new URLSearchParams();
	if(listId)
		query.append("listId",listId.toString())
	else
		query.append("all",true.toString());
	if(important)
		query.append("important",important.toString())
	if(done)
		query.append("done",done.toString())
	if(urgent)
		query.append("urgent",urgent.toString())
	await axios.delete("/api/todos?"+query.toString())
}