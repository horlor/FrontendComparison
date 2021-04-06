<script lang="ts">
import TodosRepo from "../../stores/TodosStore"

import type { Todo } from "../../models/Todo";
import clickAway from "../util/ClickAway"
import DateInput from "../util/DateInput.svelte";
import ConfirmDialog from "../util/ConfirmDialog.svelte";

	export let todo: Todo  | undefined

	function close(){
		todo = undefined;
	}

	async function save(){
		await TodosRepo.updateTodo(todo);
		todo=undefined
	}

	let deleteDialogOpen = false;

	function openDeleteDialog(){
		deleteDialogOpen = true;
	}

	function changeDone(){
		TodosRepo.setTodoDone(todo)
		//todo.done = !todo.done
	}

	function changeImportant(){
		TodosRepo.setTodoImportant(todo)
	}

</script>
{#if !!todo}
	<div use:clickAway={{enabled:true, onClickAway:()=>close()}} class="fixed h-screen right-0 top-0 w-480px z-20 border-gray-100 border-l-2 bg-white p-2" >
		<button class="inline-block text-right" on:click={close}>
			<svg class="h-6 w-6 text-gray-500 fill-current" viewBox="0 0 20 20">
				<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
			</svg>
		</button>
		<div class="flex flex-row w-full p-1 ">
			<button class="border-gray-300 rounded-sm border self-stretch w-7 pr-1"
			on:click={changeDone}>
				{#if todo.done}
				<svg class="block h-7 w-7  text-green-500 fill-current"  viewBox="0 0 20 20">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
				</svg>
				{/if}
			</button>
			<input bind:value={todo.title} class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
			<button class="border-gray-300 rounded-sm border self-stretch w-7 pr-1" 
			on:click={changeImportant}>
				<svg class={"inline-block h-6 w-6 "+(todo.important?"text-yellow-300":"text-gray-500")+ " fill-current"} viewBox="0 0 20 20">
					<path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
				</svg>
			</button>
			<button class="border-gray-300 rounded-sm border self-stretch w-7 pr-1" 
			on:click={openDeleteDialog}>
				<svg class="block h-5 w-5  text-gray-700 fill-current" viewBox="0 0 20 20">
					<path  d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
					<path  d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
					<path  d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
				</svg>
			</button>
		</div>
		<label class="block" for="todo-detail-date">Deadline:</label>
		<DateInput id="todo-detail-date" bind:value={todo.deadLine}/>

		<label class="block" for="todo-detail-desc">Description:</label>
		<textarea class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="todo-detail-desc" bind:value={todo.description}/>
		<button on:click={save}>Ok</button>
		<h4>{todo.important?"AAA":"BB"}</h4>
	</div>
	<ConfirmDialog
		title="Deleting todo"
		body="Are you sure to delete this todo?"
		open={deleteDialogOpen}
		on:ok={async()=> {await TodosRepo.deleteTodo(todo); deleteDialogOpen = false}}
		on:cancel={()=> deleteDialogOpen = false}
	/>
{/if}

<style>
	.w-480px{
		width:480px
	}
</style>