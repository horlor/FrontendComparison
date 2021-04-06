<script lang="ts">
	import ListRepo from "../../stores/ListsStore"
	import MenuLink from "../util/MenuLink.svelte"
	var lists = ListRepo.lists
	ListRepo.load();
</script>
<MenuLink to="/general">General</MenuLink>
<MenuLink to="/important">Important</MenuLink>
<MenuLink to="/urgent">Urgent</MenuLink>
{#if $lists}
	{#each $lists as list}
	<MenuLink to="{list.id}">{list.name}</MenuLink>
	{/each}
{:else}
<p>Loading...</p>
{/if}
<!--
{#await GetLists()}
<p>Loading...</p>
{:then lists} 
{#each lists as list}
<MenuLink to="{list.id}">{list.name}</MenuLink>
{/each}
{:catch error}
<p>Error</p>
{/await}
-->
