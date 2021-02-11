import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import { GetLists } from "../api/ListsApi"
import { AddTodo, GetTodos, UpdateTodo } from "../api/TodoApi"
import { List } from "../models/List"
import { Todo } from "../models/Todo"

export const useTodoEdit = ()=>{
	const queryClient = useQueryClient();
	return useMutation(UpdateTodo, {
		onSuccess:(data, variables, context)=>{
			queryClient.invalidateQueries(["todos",variables.listId]);
		}
	})
}

export const useTodoAdd = (list: number | null)=>{
	const queryClient = useQueryClient();
	return useMutation(AddTodo,{
		onSuccess:(data, variables, context)=>{
			queryClient.invalidateQueries(["todos",list]);
		}
	});
}

export const useTodos = ()=>{
	const queryClient = useQueryClient();
	const {id} = useParams<{id:string|undefined}>();
	const listId = id?parseInt(id):null
	const todoResult = useQuery<Todo[],Error>(["todos",listId],()=>GetTodos(listId))
	const edit = useTodoEdit();
	return {todos: todoResult};
}

export const useLists = ()=>{
	const lists = useQuery<List[],Error>(["lists"],GetLists);
	return {lists}
}