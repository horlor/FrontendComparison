import axios from "axios";
import type { List } from "../models/List";

export async function GetLists(): Promise<List[]>{
	return (await axios.get<List[]>("/api/lists")).data;
}

export async function GetList(listId: string){
	return (await axios.get<List>(`/api/lists/${listId}`)).data;
}

export async function AddList(list: List){
	return (await axios.post("/api/lists",list)).data;
}

export async function UpdateList(list: List){
	return (await axios.put(`/api/lists/${list.id}`,list)).data;
}

export async function RemoveList(list: List){
	await axios.delete(`/api/lists/${list.id}`);
}