import { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { GeneratedIdentifierFlags } from "typescript"
import { AddList, GetList, GetLists, RemoveList } from "../api/ListsApi"
import { AddTodo, DeleteTodos, GetListWithTodos, GetTodos, RemoveTodo, SetTodoDone, SwitchTodoImportant, UpdateTodo } from "../api/TodoApi"
import { AppError } from "../models/Error"
import { List, ListWithTodos } from "../models/List"
import { Todo } from "../models/Todo"

export const useTodoEdit = ()=>{
	const queryClient = useQueryClient();
	return useMutation<any,Error,Todo,unknown>(UpdateTodo, {
		onSuccess:(data, variables, context)=>{
			if(variables.listId == null){
				queryClient.invalidateQueries(["lists",undefined])
				queryClient.invalidateQueries(["lists","urgent"])
				queryClient.invalidateQueries(["lists","important"])
			}
			else
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	})
}

export const useTodoAdd = (list: string | null)=>{
	const queryClient = useQueryClient();
	return useMutation<Todo,Error,Todo,unknown>(AddTodo,{
		onSuccess:(data, variables, context)=>{
			if(variables.listId == null){
				queryClient.invalidateQueries(["lists",undefined])
				queryClient.invalidateQueries(["lists","urgent"])
				queryClient.invalidateQueries(["lists","important"])
			}
			else
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	});
}


export const useTodoDelete = ()=>{
	const queryClient = useQueryClient();
	return useMutation<any,Error,Todo,unknown>(RemoveTodo,{
		onSuccess:(data,variables,context)=>{
			if(variables.listId == null){
				queryClient.invalidateQueries(["lists",undefined])
				queryClient.invalidateQueries(["lists","urgent"])
				queryClient.invalidateQueries(["lists","important"])
			}
			else
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	})
}

export const useTodo = ()=>{
	const queryClient = useQueryClient();
	const doneMutation = useMutation<any,Error,Todo,unknown>(SetTodoDone,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	})
	const importantMutation = useMutation<any,Error,Todo,unknown>(SwitchTodoImportant,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	})
	return {doneMutation, importantMutation}
}

export const useTodos = ()=>{
	const queryClient = useQueryClient();
	const {id}  = useParams<{id:string|undefined}>();
	console.log("Id",id)
	const listResult = useQuery<ListWithTodos,AppError>(["lists",id],()=>GetListWithTodos(id));
	return {list: listResult};
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

export const useListDelete = ()=>{
	const queryClient = useQueryClient();
	return useMutation<unknown,Error,List,unknown>(RemoveList, {
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["lists"]);
		}
	})
}

export const useTodosDelete = ()=>{
	const queryClient = useQueryClient();
	return useMutation(DeleteTodos,{
		onSuccess:(data,variables,context)=>{
			queryClient.invalidateQueries(["lists",variables.listId]);
		}
	});
}
export const useListHeader = (list: List | null | undefined)=>{
	const listDelete = useListDelete();
	const todosDelete = useTodosDelete();
	const history = useHistory();

	function deleteAllDoneTodos(){
		if(list)
			todosDelete.mutate({done: true, listId: list.id});
	}

	function deleteList(){
		if(list && !list.builtIn){
			listDelete.mutate(list)
			history.push("/");
		}
			
	}

	function deleteAllTodos(){
		if(list)
			todosDelete.mutate({done: false, listId: list.id});
	}
	return {deleteAllDoneTodos, deleteList, deleteAllTodos}

}