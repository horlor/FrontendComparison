export interface Todo{
	id: string | null,
	title: string,
	description?: string,
	important: boolean,
	done: boolean,
	deadLine: string | null,
	ownerId: string | null,
	listId: string | null,
}