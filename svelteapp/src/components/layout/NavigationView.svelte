<script>
let navDrawerOpen = false;
import clickAway from "../util/ClickAway"
</script>

<div class="body overflow-hidden">
	<header class="bg-gray-800 fixed top-0 w-full z-10">
		<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		  <div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
			  <!-- Mobile menu button-->
			  <button type="button" 
			  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
			  aria-controls="mobile-menu" aria-expanded="false"
			  on:click="{()=> navDrawerOpen = !navDrawerOpen}">
				<span class="sr-only">Open main menu</span>
{#if !navDrawerOpen}
				<!--
				  Icon when menu is closed.
	  
				  Heroicon name: outline/menu
	  
				  Menu open: "hidden", Menu closed: "block"
				-->
				<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
{:else}
				<!--
				  Icon when menu is open.
	  
				  Heroicon name: outline/x
	  
				  Menu open: "block", Menu closed: "hidden"
				-->
				<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				  </svg>
{/if}
			  </button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
			  <div class="flex-shrink-0 flex items-center text-white font-bold subpixel-antialiased italic">
				What should I Do?
			  </div>
			</div>
		  </div>
		</div>
	</header>
	<div class="flex flex-row h-full w-full flex-grow">
		<nav class=" box-border h-full hidden md:block  px-4 pb-4 md:pb-0 md:overflow-y-auto w-64 border-r-2 border-gray-100">
			<div class="h-16"/>
			<slot name="nav">
			</slot>
		</nav>
		<main class="overflow-y-scroll h-full w-full bg-gray-100">
			<div class="h-16"/>
			<slot name="main">Placeholder for main</slot>
		</main>
	</div>
</div>
{#if navDrawerOpen}
	<nav use:clickAway={{enabled:true, onClickAway:()=> navDrawerOpen = false}} class="fixed h-screen left-0 top-0 md:invisible bg-white w-64">
		<div class="h-16"/>
		<slot name="nav">
		</slot>
	</nav>
{/if}


<style>
	.body{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}
</style>