<script lang="ts">
	import ListRepo from "../../stores/ListsStore"
import MenuItem from "../util/MenuItem.svelte";
	import MenuLink from "../util/MenuLink.svelte"
import AddListView from "./AddListView.svelte";
	var lists = ListRepo.lists
	let error = ListRepo.error
	ListRepo.load();
	let open = false;
</script>
<MenuLink to="/general">General</MenuLink>
<MenuLink to="/important">Important</MenuLink>
<MenuLink to="/urgent">Urgent</MenuLink>
{#if $error}
	<div class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg">An error occured, please try later</div>
{:else}
	{#if $lists}
		{#each $lists as list}
		<MenuLink to="{list.id}">{list.name}</MenuLink>
		{/each}
		<button on:click="{()=> open = true}" class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Add new List</button>
		<AddListView list={undefined} open={open}/>
	{:else}
	<p>Loading...</p>
	{/if}
{/if}

