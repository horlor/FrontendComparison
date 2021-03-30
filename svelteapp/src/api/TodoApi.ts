import axios, {  AxiosResponse } from "axios";
import type { List, ListWithTodos } from "../models/List";
import type { Todo } from "../models/Todo";
import { GetList } from "./ListsApi";


export async function GetTodos(listId:string | null){
	let url = listId?`/api/todos/?listId=${listId}`:"/api/todos/"
	return (await axios.get<Todo[]>(url)).data;
}

export async function UpdateTodo(todo: Todo){
	return (await axios.put(`/api/todos/${todo.id}`,todo)).data;
}

export async function AddTodo(todo: Todo) {
	if(todo.listId == "general" || todo.listId == "important" || todo.listId == "urgent")
		todo.listId = null;
	if(todo.listId =="important")
		todo.important = true;
	if(todo.listId == "urgent")
		todo.deadLine = todo.deadLine; //TODO handling urgent adding
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

export async function DeleteTodos(param: { done?:boolean, listId: string | null}){
	var query = new URLSearchParams();
	console.log(param)
	if(param.listId){
		switch(param.listId){
			case "general":
				break;
			case "important":
				query.append("important",true.toString())
				query.append("all",true.toString())
				break;
			case "urgent":
				query.append("urgent",true.toString())
				query.append("all",true.toString())
				break;
			default:
				query.append("listId",param.listId.toString())
		}			
	}		
	if(param.done)
		query.append("onlyDone",param.done.toString())
	await axios.delete("/api/todos?"+query.toString())
}

export async function GetListWithTodos(id?: string | null): Promise<ListWithTodos>{
	console.log("GetListWithTodos",id)
	let list : Promise<List>, todos : Promise<AxiosResponse<Todo[]>>;
	if(id == "general" || id == undefined || id == null)
	{
		list = Promise.resolve({
			name:"General",
			id:"general",
			builtIn:true
		})
		todos = axios.get<Todo[]>("/api/todos");
	}
	else if(id == "important")
	{
		list = Promise.resolve({
			name:"Important",
			id:"important",
			builtIn:true
		})
		todos = axios.get<Todo[]>("/api/todos?all=true&important=true");
	}
	else if(id == "urgent")
	{
		list = Promise.resolve({
			name:"Urgent",
			id:"urgent",
			builtIn:true
		})
		todos = axios.get<Todo[]>("/api/todos?all=true&urgent=true");
	}
	else
	{
		list = GetList(id)
		todos = axios.get(`/api/todos?listId=${id}`);
	}
	let ret = await Promise.all([list,todos])
	return {...ret[0], todos: ret[1].data};
}