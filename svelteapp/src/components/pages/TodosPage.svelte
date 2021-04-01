<script lang="ts">
	export let id : string = "general"
	console.log(id)

import { loop_guard } from "svelte/internal";
	import {GetListWithTodos} from "../../api/TodoApi"
import type { Todo } from "../../models/Todo";
import AddTodoView from "../todo/AddTodoView.svelte"
import TodoCard from "../todo/TodoCard.svelte"
import TodoDetailPanel from "../todo/TodoDetailPanel.svelte"

	let selected : Todo | undefined = undefined;
</script>

<div class="container mx-auto px-2">
{#await  GetListWithTodos(id)}
	Loading...
{:then list} 
	<h2 class="font-bold text-2xl">{list.name}</h2>
	<AddTodoView id={id}/>
	{#each list.todos as todo}
		<TodoCard todo="{todo}" on:click={()=>{
			selected = todo;
			console.log(selected)
		}}/>
	{/each}
{/await}
</div>
<TodoDetailPanel bind:todo={selected}/>