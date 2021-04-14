<script lang="ts">
import type { ListWithTodos } from "../../models/List";
import Menu from "../util/Menu.svelte";
import MenuItem from "../util/MenuItem.svelte";
import TodosRepo from "../../stores/TodosStore"
import ListsStore from "../../stores/ListsStore"
import AddListView from "./AddListView.svelte";
import ConfirmDialog from "../common/ConfirmDialog.svelte";
import AddTodoView from "../todo/AddTodoView.svelte";
import App from "../../App.svelte";
import DateInput from "../util/DateInput.svelte";
import ErrorCard from "../common/ErrorCard.svelte";

	export let list : ListWithTodos

	let open = false;
	let editOpen = false;

	let confirm = {open: false, title:"", body:"", action:async()=>{}}
</script>
<div class="flex flex-row justify-between mt-1">
	<h3 class="text-2xl">{list.name}</h3>
	<div class="self-strech">
		<button class="border-gray-300 bg-white rounded-sm border self-stretch h-7 w-7 pr-1" on:click={()=> open = !open} aria-label="Open Menu">
			<svg class="text-gray-600 fill-current w-5 h-5" focusable="false" width="1em" height="1em"viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#333" d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg>
		</button>
		<Menu open={open}>
			{#if !list.builtIn}
			<MenuItem on:click={()=> editOpen= true}>
				Edit Lists title
			</MenuItem>
			<MenuItem on:click={()=> confirm = {action:()=>ListsStore.deleteList(list), title:"Deleting list", body:"Are you sure to delete this list?", open:true}}>
				Delete List
			</MenuItem>
			{/if}
			<MenuItem on:click={()=> confirm = {action:()=>TodosRepo.deleteAllTodos(), title:"Deleting todos", body:"Are you sure to delete all the todos of this list?", open:true} }>
				Delete All todos
			</MenuItem>
			<MenuItem on:click={()=> confirm = {action:()=>TodosRepo.deleteAllDoneTodos(), title:"Deleting todos", body:"Are you sure to delete all the done todos of this list?", open:true}}>
				Delete All Done todos
			</MenuItem>
		</Menu>
	</div>
	<ConfirmDialog {...confirm} on:ok={()=>{confirm.action(); confirm = {...confirm, open:false}}} on:cancel={()=>confirm = {...confirm, open:false}}/>
	<AddListView list={list} open={editOpen}/>
</div>