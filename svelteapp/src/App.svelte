<script lang="ts">
	import NavigationView from "./components/layout/NavigationView.svelte"
	export let name: string;
</script>


<NavigationView>

</NavigationView>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	body{
		height:100vh;
		width:100vw;
		display: flex;
		flex-direction: column;
	}
	
  </style>