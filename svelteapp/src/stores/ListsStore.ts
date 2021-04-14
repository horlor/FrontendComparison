import {writable} from "svelte/store"
import { AddList, GetLists, UpdateList } from "../api/ListsApi";
import type { List } from "../models/List"
import {RemoveList} from "../api/ListsApi"
import type { Todo } from "../models/Todo";
import  readOnly from "./ReadOnlyStore"
import { get } from 'svelte/store';
import type { AppError } from "../models/Error";
import { parseError } from "../api/ErrorUtil";
import TodosRepo from "./TodosStore";

class ListRepoClass{
	private store = writable<List[]>([])
	private _error = writable<AppError>(null)
	private _operationError = writable<AppError>(null)
	private loaded = false;
	get lists(){
		return readOnly(this.store);
	}

	get error(){
		return readOnly(this._error)
	}

	get operationError(){
		return readOnly(this._operationError)
	}

	public async load(){
		if(!this.loaded){
			this.loaded = true;
			await this.invalidate();
		}
	}

	public async deleteList(list: List){
		try{
			await RemoveList(list);
			this.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async invalidate(){
		try{
			this.store.set(await GetLists());
		}
		catch(e){
			this._error.set(parseError(e))
		}
	}

	public async addList(list: List){
		try{
			await AddList(list);
			this.invalidate();
		}		
		catch(e){
			this._operationError.set(parseError(e))
		}
	}

	public async updateList(list: List){
		try{
			await UpdateList(list);
			this.invalidate();
			TodosRepo.invalidate();
		}
		catch(e){
			this._operationError.set(parseError(e))
		}
	}
}

const ListRepo = new ListRepoClass();
export default ListRepo;
