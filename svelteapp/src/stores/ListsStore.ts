import {writable} from "svelte/store"
import { GetLists } from "../api/ListsApi";
import type { List } from "../models/List"
import type { Todo } from "../models/Todo";
import  readOnly from "./ReadOnlyStore"

class ListRepoClass{
	private store = writable<List[]>([])
	private loaded = false;
	get lists(){
		return readOnly(this.store);
	}

	public async load(){
		if(!this.loaded){
			this.loaded = true;
			await this.invalidate();
		}
	}

	public async invalidate(){
		this.store.set(await GetLists());
	}
}

const ListRepo = new ListRepoClass();
export default ListRepo;
