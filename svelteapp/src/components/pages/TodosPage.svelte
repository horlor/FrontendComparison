<script lang="ts">
	export let id : string = "general"
	console.log(id)

	import {GetListWithTodos} from "../../api/TodoApi"
import AddTodoView from "../todo/AddTodoView.svelte"
import TodoCard from "../todo/TodoCard.svelte"
</script>

<div class="container mx-auto px-2">
{#await  GetListWithTodos(id)}
	Loading...
{:then list} 
	<h2>{list.name}</h2>
	<AddTodoView id={id}/>
	{#each list.todos as todo}
		<TodoCard todo="{todo}"/>
	{/each}
{/await}
</div>