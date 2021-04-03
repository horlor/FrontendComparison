import { writable } from "svelte/store";
import { GetListWithTodos } from "../api/TodoApi";
import type { ListWithTodos } from "../models/List";
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
}

const TodosRepo = new TodosRepoClass()

export default TodosRepo;