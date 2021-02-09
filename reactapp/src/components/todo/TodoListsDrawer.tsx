import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useLists } from "../../hooks/TodoHooks";

const TodoListsDrawer : React.FC = props=>{
	const {lists} = useLists();
	return (
	<List>
		<ListItem button component={Link} to="/">
			<ListItemText>General</ListItemText>
		</ListItem>
		{
			lists.data?lists.data.map((value, idx) => (
				<ListItem key={value.id} button component={Link} to={`/${value.id}`}>
					<ListItemText>{value.name}</ListItemText>
				</ListItem>
			)):""
		}
	</List>)
}

export default TodoListsDrawer;