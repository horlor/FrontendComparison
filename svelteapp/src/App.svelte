<script lang="ts">
	import NavigationView from "./components/layout/NavigationView.svelte"
	import { Router, Link, Route } from "svelte-routing";
	import axios from "axios"
	import ListsMenu from "./components/list/ListsMenu.svelte"
	import TodosPage from "./components/pages/TodosPage.svelte"

	axios.defaults.baseURL="http://localhost:5000"
	axios.defaults.headers["Authorization"] = "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNTE0NzY3OS0wMjFlLTRiOGMtYjJmZi1kNTVhY2YxYTBmMmMiLCJqdGkiOiJiOWEwZWE2Mi1jNzYyLTQ4MTAtYjgxMC1mZjJjZmY4NmUxZmEiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxODIxNjcyNywiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ.EF0BwPLDJBAuYdHrXzO3LGwprAEVXdzTBLl61JV9SNo"

	export let url = "/"
</script>

<Router url={url}>
	<NavigationView>
		<svelte:fragment slot="nav">
			<ListsMenu/>
		</svelte:fragment>
		<div slot="main">
			<Route  path="/:id" let:params>
				<TodosPage id="{params.id}"/>
			</Route>
		</div>
	</NavigationView>
</Router>


<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;


	
  </style>