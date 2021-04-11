<script lang="ts">
	import ListRepo from "../../stores/ListsStore"
	import MenuLink from "../util/MenuLink.svelte"
import AddListView from "./AddListView.svelte";
	var lists = ListRepo.lists
	let error = ListRepo.error
	ListRepo.load();
	console.log(lists)
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
		<AddListView/>
	{:else}
	<p>Loading...</p>
	{/if}
{/if}

