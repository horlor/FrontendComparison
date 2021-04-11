<script lang="ts">
import type { AppError } from "../../models/Error";
import Modal from "../util/Modal.svelte";

	export let error : AppError
</script>
<Modal open={!!error}>
	<h3 class="text-lg font-semibold">{error.name}</h3>
	<hr>
	<p>{error.message}</p>
	<button class="block px-4 py-2 mt-2 mr-5 mx-auto text-sm font-semibold text-gray-900 bg-transparent rounded-md border border-gray-400 hover:border-gray-600 focus:border-gray-600 hover:text-gray-600 focus:text-gray-600" on:click={()=> error = undefined}>Ok</button>
</Modal>
