<script lang="ts">
import { UpdateTodo } from "../../api/TodoApi";

import type { Todo } from "../../models/Todo";
import clickAway from "../util/ClickAway"
import DateInput from "../util/DateInput.svelte";

	export let todo: Todo  | undefined

	function handleClick(){

	}

	function close(){
		todo = undefined;
	}

	async function save(){
		await UpdateTodo(todo);
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
			<button class="border-gray-300 rounded-sm border self-stretch w-7 pr-1">
				{#if todo.done}
				<svg class="block h-7 w-7  text-green-500 fill-current"  viewBox="0 0 20 20">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
				</svg>
				{/if}
			</button>
			<input bind:value={todo.title} class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
		</div>
		<label class="block" for="todo-detail-date">Deadline:</label>
		<DateInput id="todo-detail-date" bind:value={todo.deadLine}/>

		<label class="block" for="todo-detail-desc">Description:</label>
		<textarea class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="todo-detail-desc" bind:value={todo.description}/>
		<button on:click={save}>Ok</button>
	</div>
{/if}

<style>
	.w-480px{
		width:480px
	}
</style>