import {  Box, Container, createStyles, Divider, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import { More, MoreHoriz } from "@material-ui/icons";
import React from "react";
import { useTodos } from "../../hooks/TodoHooks";
import NavigationView from "../common/NavigationView";
import AddTodoView from "../todo/AddTodoView";
import TodoView from "../todo/TodoView";
import TodoListsDrawer from "../todo/TodoListsDrawer";
import TodoListHeader from "../todo/TodoListHeader";
import LoadingView from "../common/LoadingView";
import AsyncHandler from "../common/AsyncHandler";
import ErrorView from "../common/ErrorView";


const TodoPage : React.FC = props=>{
	const {todos, list} = useTodos()

	return (
	<NavigationView drawer={<TodoListsDrawer/>}>
		<AsyncHandler
			isError={todos.isError || list.isError}
			errorView={<ErrorView error={list.error}/>}
			isLoading={todos.isLoading || list.isLoading}
			loader={<LoadingView/>}
		>
			<Container>
			<TodoListHeader list={list}/>
			<AddTodoView listId={list.data?list.data.id:null}/>
			{
			todos.data?todos.data?.map((value, idx)=>(
					<TodoView key={value.id} todo={value}/>)
				):""
			}
			</Container>
		</AsyncHandler>
	</NavigationView>
	);
}

export default TodoPage;