import { writable } from "svelte/store";
import { AddTodo, RemoveTodo, GetListWithTodos, UpdateTodo, SwitchTodoImportant, SetTodoDone } from "../api/TodoApi";
import type { ListWithTodos } from "../models/List";
import type { Todo } from "../models/Todo";
import readOnly from "./ReadOnlyStore";

class TodosRepoClass{
	private store = writable<ListWithTodos>(null)
	private _id = "general"

	public set id(value: string){
		this._id = value;
		this.invalidate();
	}
	public get id(){
		return this._id;
	}

	public get list(){
		return readOnly(this.store)
	}

	public async invalidate(){
		this.store.set(await GetListWithTodos(this._id))
	}

	public async updateTodo(todo:Todo){
		await UpdateTodo(todo);
		this.invalidate();
	}

	public async addTodo(todo: Todo){
		await AddTodo(todo);
		this.invalidate();
	}

	public async deleteTodo(todo:Todo){
		await RemoveTodo(todo);
		this.invalidate();
	}

	public async setTodoImportant(todo: Todo){
		await SwitchTodoImportant(todo);
		this.invalidate();
	}

	public async setTodoDone(todo: Todo){
		await SetTodoDone(todo)
		this.invalidate();
	}
}

const TodosRepo = new TodosRepoClass()

export default TodosRepo;