<script lang="ts">
	export let id : string = "general"
	console.log(id)

	import {GetListWithTodos} from "../../api/TodoApi"
import TodoCard from "../todo/TodoCard.svelte"
</script>

<div class="container mx-auto px-2">
{#await  GetListWithTodos(id)}
	Loading...
{:then list} 
	<h2>{list.name}</h2>
	{#each list.todos as todo}
		<TodoCard todo="{todo}"/>
	{/each}
{/await}
</div>