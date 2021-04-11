import { writable } from "svelte/store";
import { parseError } from "../api/ErrorUtil";
import { AddTodo, RemoveTodo, GetListWithTodos, UpdateTodo, SwitchTodoImportant, SetTodoDone, DeleteTodos } from "../api/TodoApi";
import type { AppError } from "../models/Error";
import type { ListWithTodos } from "../models/List";
import type { Todo } from "../models/Todo";
import readOnly from "./ReadOnlyStore";

class TodosRepoClass{
	private store = writable<ListWithTodos>(null)
	private _error = writable<AppError>(null)
	private _operationError = writable<AppError>(null)

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

	get error(){
		return readOnly(this._error)
	}
	get operationError(){
		return readOnly(this._operationError)
	}

	public async invalidate(){
		try{
			this._error.set(undefined)
			this.store.set(await GetListWithTodos(this._id))
		}
		catch(e){
			this._error.set(parseError(e))
		}
	}

	public async updateTodo(todo:Todo){
		try{
			await UpdateTodo(todo);
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async addTodo(todo: Todo){
		try{
			await AddTodo(todo);
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async deleteTodo(todo:Todo){
		try{
			await RemoveTodo(todo);
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async setTodoImportant(todo: Todo){
		try{
			await SwitchTodoImportant(todo);
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async setTodoDone(todo: Todo){
		try{
			await SetTodoDone(todo)
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async deleteAllTodos(){
		try{
			await DeleteTodos({done:false,listId: this.id})
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async deleteAllDoneTodos(){
		try{
			await DeleteTodos({done:true,listId: this.id})
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}
}

const TodosRepo = new TodosRepoClass()

export default TodosRepo;