<script lang="ts">
	export let id : string = "general"
import type { Todo } from "../../models/Todo";
import AddTodoView from "../todo/AddTodoView.svelte"
import TodoCard from "../todo/TodoCard.svelte"
import TodoDetailPanel from "../todo/TodoDetailPanel.svelte"
import TodosRepo from "../../stores/TodosStore"
	let selected : Todo | undefined =undefined;
let list = TodosRepo.list
$: TodosRepo.id = id;
</script>

<div class="container mx-auto px-2">
{#if $list}
<h2 class="font-bold text-2xl">{$list.name}</h2>
<AddTodoView id={id}/>
{#each $list.todos as todo}
	<TodoCard todo="{todo}" on:click={()=>{
		selected = todo;
	}}/>
{/each}
{:else} 
	<p>Loading...</p>
{/if}
</div>
<TodoDetailPanel todo={selected}/>
