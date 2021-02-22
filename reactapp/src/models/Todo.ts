export interface Todo{
	id: number,
	title: string,
	description?: string,
	important: boolean,
	done: boolean,
	deadLine: string | null,
	ownerId: string | null,
	listId: number | null,
}