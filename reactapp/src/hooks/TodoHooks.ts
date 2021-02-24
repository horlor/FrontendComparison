import { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation, useParams } from "react-router-dom"
import { AddList, GetList, GetLists } from "../api/ListsApi"
import { AddTodo, GetTodos, RemoveTodo, SetTodoDone, SwitchTodoImportant, UpdateTodo } from "../api/TodoApi"
import { AppError } from "../models/Error"
import { List } from "../models/List"
import { Todo } from "../models/Todo"

export const useTodoEdit = ()=>{
	const queryClient = useQueryClient();
	return useMutation<any,Error,Todo,unknown>(UpdateTodo, {
		onSuccess:(data, variables, context)=>{
			queryClient.invalidateQueries(["todos",variables.listId]);
		}
	})
}

export const useTodoAdd = (list: number | null)=>{
	const queryClient = useQueryClient();
	return useMutation<Todo,Error,Todo,unknown>(AddTodo,{
		onSuccess:(data, variables, context)=>{
			queryClient.invalidateQueries(["todos",list]);
		}
	});
}


export const useTodoDelete = ()=>{
	const queryClient = useQueryClient();
	return useMutation<any,Error,Todo,unknown>(RemoveTodo,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["todos",variables.listId]);
		}
	})
}

export const useTodo = ()=>{
	const queryClient = useQueryClient();
	const doneMutation = useMutation<any,Error,Todo,unknown>(SetTodoDone,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["todos",variables.listId]);
		}
	})
	const importantMutation = useMutation<any,Error,Todo,unknown>(SwitchTodoImportant,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["todos",variables.listId]);
		}
	})
	return {doneMutation, importantMutation}
}

export const useTodos = ()=>{
	const queryClient = useQueryClient();
	const {id} = useParams<{id:string|undefined}>();
	const listId = id?parseInt(id):null
	const listResult = useQuery<List,AppError>(["lists",listId],()=>listId?GetList(listId):{id:0,name:"General",builtIn:true});
	const todoResult = useQuery<Todo[],AppError>(["todos",listId],()=>GetTodos(listId))
	return {list: listResult, todos: todoResult};
}

export const useLists = ()=>{
	const lists = useQuery<List[],AppError>(["lists"],GetLists);
	return {lists}
}

export const useListAdd = ()=>{
	const queryClient = useQueryClient();
	return useMutation<unknown,Error,List,unknown>(AddList, {
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["lists"]);
		}
	})
}