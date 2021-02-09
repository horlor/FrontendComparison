export interface Todo{
	id: number,
	title: string,
	description: string,
	important: boolean,
	done: boolean,
	deadLine?: string,
	ownerId: string | null,
	listId: string | null,
}