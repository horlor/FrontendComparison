<script lang="ts">
import type { ListWithTodos } from "../../models/List";
import Menu from "../util/Menu.svelte";
import MenuItem from "../util/MenuItem.svelte";
import TodosRepo from "../../stores/TodosStore"
import ListsStore from "../../stores/ListsStore"

	export let list : ListWithTodos

	let open = false;
</script>
<div class="flex flex-row justify-between mt-1">
	<h3 class="text-2xl">{list.name}</h3>
	<div class="self-strech">
		<button class="border-gray-300 bg-white rounded-sm border self-stretch h-7 w-7 pr-1" on:click={()=> open = !open} aria-label="Open Menu">
			<svg class="text-gray-600 fill-current w-5 h-5" focusable="false" width="1em" height="1em"viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#333" d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg>
		</button>
		<Menu open={open}>
			{#if !list.builtIn}
			<MenuItem on:click={()=> ListsStore.deleteList(list)}>
				Delete List
			</MenuItem>
			{/if}
			<MenuItem on:click={()=> TodosRepo.deleteAllTodos()}>
				Delete All todos
			</MenuItem>
			<MenuItem on:click={()=> TodosRepo.deleteAllDoneTodos()}>
				Delete All Done todos
			</MenuItem>
		</Menu>
	</div>

</div>