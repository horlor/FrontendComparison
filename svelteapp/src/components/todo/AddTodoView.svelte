<script lang="ts">
import TodosRepo from "../../stores/TodosStore"
	export let id="general";

	let title = ""
	function keypress(e : KeyboardEvent){
		if(e.code=="Enter"){
			TodosRepo.addTodo({title:title, important:false, done: false, id:"",deadLine:null, ownerId:"", listId:id})
			title = ""
		}
			
	}
</script>
<div class="w-full bg-white border-gray-300 shadow-md rounded-md p-2 flex flex-row m-2 items-center">
	<button class="h-6 w-6">
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
			<g>
				<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="32" y1="50" x2="32" y2="14"/>
				<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="32" x2="50" y2="32"/>
			</g>
		</svg>
	</button>
	<input on:keyup={keypress} bind:value={title} placeholder="Type here your to dos... (Press enter to save)" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-blue-500 focus:z-10 sm:text-sm">
</div> 