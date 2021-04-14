<script lang="ts">
	import clickaway from "./ClickAway"
	export let open = false

	function onClose(){
		open = false;
	}
	$: param = {enabled:open, onClickAway:onClose}
</script>
{#if open}
<div  class="relative inline-block text-left">  
	<!--
	  Dropdown menu, show/hide based on menu state.
  
	  Entering: "transition ease-out duration-100"
		From: "transform opacity-0 scale-95"
		To: "transform opacity-100 scale-100"
	  Leaving: "transition ease-in duration-75"
		From: "transform opacity-100 scale-100"
		To: "transform opacity-0 scale-95"
	-->
	<div use:clickaway={param} class={"origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none transition ease-out duration-80 "
				+ (open?" transform opacity-100 scale-100":" transform opacity-0 scale-95")} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
		<slot></slot>
	</div>
  </div>
{/if}