<script lang="ts">
	export let open =false;

	console.log("Open",open)
</script>
{#if open}
<div class="fixed z-30 inset-0 overflow-y-auto w-screen h-screen" aria-labelledby="modal-title" role="dialog" aria-modal="true" on:click|stopPropagation>
	<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
	  <!--
		Background overlay, show/hide based on modal state.
  
		Entering: "ease-out duration-300"
		  From: "opacity-0"
		  To: "opacity-100"
		Leaving: "ease-in duration-200"
		  From: "opacity-100"
		  To: "opacity-0"
	  -->
	  <div class={"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"} aria-hidden="true"></div>
	  <!-- This element is to trick the browser into centering the modal contents. -->
	  <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
	  <!--
		Modal panel, show/hide based on modal state.
  
		Entering: "ease-out duration-300"
		  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		  To: "opacity-100 translate-y-0 sm:scale-100"
		Leaving: "ease-in duration-200"
		  From: "opacity-100 translate-y-0 sm:scale-100"
		  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
	  -->
	  <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-3">
		<slot></slot>
	  </div>
	</div>
  </div>
  {/if}