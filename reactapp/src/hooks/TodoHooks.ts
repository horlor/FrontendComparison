import { useQuery } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import { GetLists } from "../api/ListsApi"
import { GetTodos } from "../api/TodoApi"
import { List } from "../models/List"
import { Todo } from "../models/Todo"

export const useTodos = ()=>{
	const {id} = useParams<{id:string|undefined}>();
	const listId = id?parseInt(id):null
	const todoResult = useQuery<Todo[],Error>(["todos",listId],()=>GetTodos(listId))
	return {todos: todoResult};
}

export const useLists = ()=>{
	const lists = useQuery<List[],Error>(["lists"],GetLists);
	return {lists}
}