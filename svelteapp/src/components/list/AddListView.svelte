<script lang="ts">
import type { List } from "../../models/List";
import ListRepo from "../../stores/ListsStore";
import Modal from "../util/Modal.svelte"
	export let open = false
	export let list: List | null
	let title= list?.name?list.name:""

	async function add(){
		if(list){
			list.name = title;
			await ListRepo.updateList(list)
		}
		else
			await ListRepo.addList({id:"", name:title})
		title=""
		open=false
	}
</script>
<Modal open={open}>
	<h3>Add new list</h3>
	<input bind:value={title} placeholder="Name of the list" class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
	<div class="flex flex-row justify-end">
		<button class="block px-4 py-2 mt-2 mr-5 text-sm font-semibold text-gray-900 bg-transparent rounded-md border border-gray-400 hover:border-gray-600 focus:border-gray-600 hover:text-gray-600 focus:text-gray-600"
		on:click={()=>open = false}>Cancel</button>
		<button class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-md border border-gray-400 hover:border-green-500 focus:border-green-500 hover:text-green-600 focus:text-green-600"
		on:click={add}>Ok</button>
	</div>
</Modal>