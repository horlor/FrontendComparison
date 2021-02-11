import { AppBar, Container, createStyles, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Theme, Toolbar, Typography } from "@material-ui/core";
import { Inbox, Mail } from "@material-ui/icons";
import React from "react";
import { useTodos } from "../../hooks/TodoHooks";
import NavigationView from "../common/NavigationView";
import AddTodoView from "../todo/AddTodoView";
import EditTodoView from "../todo/EditTodoView";
import TodoView from "../todo/TodoView";
import TodoListsDrawer from "../todo/TodoListsDrawer";


const TodoPage : React.FC = props=>{
	const {todos} = useTodos()
	return (
	<NavigationView drawer={<TodoListsDrawer/>}>
		<Container>
			<Typography component="h1" variant="h3">Todos cím</Typography>
			<AddTodoView/>
			{
			todos.data?todos.data?.map((value, idx)=>(
					<TodoView key={value.id} todo={value}/>)
				):""
			}
		</Container>
	</NavigationView>
	);
}

export default TodoPage;