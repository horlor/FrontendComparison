<script lang="ts">
		import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

function onClick(e) {
	dispatch('click', e);
}
</script>
<button on:click={onClick} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">
	<slot></slot>
</button>