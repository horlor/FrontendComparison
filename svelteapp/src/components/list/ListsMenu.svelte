<script lang="ts">
	import {GetLists} from "../../api/ListsApi"
	import MenuLink from "../layout/MenuLink.svelte"
</script>
<MenuLink to="/general">General</MenuLink>
<MenuLink to="/important">Important</MenuLink>
<MenuLink to="/urgent">Urgent</MenuLink>
{#await GetLists()}
<p>Loading...</p>
{:then lists} 
{#each lists as list}
<MenuLink to="{list.id}">{list.name}</MenuLink>
{/each}
{:catch error}
<p>Error</p>
{/await}
