import type { Todo } from "./Todo";

export interface List{
	name: string,
	id: string | null,
	builtIn?: boolean
}

export interface ListWithTodos extends List{
	todos: Todo[]
}
