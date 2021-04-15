<script lang="ts">
	export let id : string = "general"
import type { Todo } from "../../models/Todo";
import AddTodoView from "../todo/AddTodoView.svelte"
import TodoCard from "../todo/TodoCard.svelte"
import TodoDetailPanel from "../todo/TodoDetailPanel.svelte"
import TodosRepo from "../../stores/TodosStore"
import { afterUpdate } from "svelte";
import ListHeader from "../list/ListHeader.svelte";
import ErrorCard from "../common/ErrorCard.svelte";
import OperationErrorHandler from "../common/OperationErrorHandler.svelte";
import Calculate from "../common/Calculate.svelte";
	let selected : Todo | undefined =undefined;
let list = TodosRepo.list
let error =  TodosRepo.error
let operationError = TodosRepo.operationError
$: TodosRepo.id = id;

afterUpdate(()=>{
	if($list && selected){
		selected = $list.todos.find(t => t.id == selected.id)
	}
		
})
</script>
{#if $error}
	<ErrorCard error={$error}/>
{:else}
	<div class="container mx-auto pl-2 pr-3">
		{#if $list}
		<ListHeader list={$list}/>
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
{/if}
<OperationErrorHandler error={$operationError}/>
