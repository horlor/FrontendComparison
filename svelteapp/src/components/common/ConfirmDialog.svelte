<script lang="ts">
import { createEventDispatcher } from "svelte";

	import Modal from "../util/Modal.svelte"
	
	export let title =""
	export let body=""
	export let confirmText="Ok"
	export let cancelText="Cancel"
	export let open = false
	const dispatch = createEventDispatcher();
</script>
<Modal open={open}>
	<h3 class="font-semibold pr-3">{title}</h3>
	<div class="font-thin">
		{body}
	</div>
	<div class="bg-grey-50 flex flex-row justify-end">
		<button class="block px-4 py-2 mt-2 mr-5 text-sm font-semibold text-gray-900 bg-transparent rounded-md border border-gray-400 hover:border-red-600 focus:border-red-600 hover:text-red-600 focus:text-red-600"
			on:click={()=> dispatch("cancel")}
		>{cancelText}</button>
		<button class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-md border border-gray-400 hover:border-green-500 focus:border-green-500 hover:text-green-600 focus:text-green-600"
			on:click={()=> dispatch("ok")}
		>{confirmText}</button>
	</div>
</Modal>