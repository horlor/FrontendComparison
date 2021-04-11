<script lang="ts">
import type { AppError } from "../../models/Error";


	export let error: AppError
</script>
<div class="w-full bg-white border-gray-300 shadow-md rounded-md p-2 m-2">
	<h2 class="text-lg font-bold text-center">{error.name}</h2>
	<hr>
	<p>{error.message}</p>
</div>