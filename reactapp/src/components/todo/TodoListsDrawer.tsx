import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import React from "react";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ListIcon from '@material-ui/icons/List';
import { Link } from "react-router-dom";
import { useLists } from "../../hooks/TodoHooks";
import { Add } from "@material-ui/icons";
import AddListDialog from "./AddListDialog";

const TodoListsDrawer : React.FC = props=>{
	const {lists} = useLists();
	return (
	<List>
		<ListItem button component={Link} to="/">
			<ListItemIcon>
				<ListIcon/>
			</ListItemIcon>
			<ListItemText>General</ListItemText>
		</ListItem>
		<ListItem button component={Link} to="/">
			<ListItemIcon>
				<EventAvailableIcon/>
			</ListItemIcon>
			<ListItemText>Urgent</ListItemText>
		</ListItem>
		<ListItem button component={Link} to="/">
			<ListItemIcon>
				<LabelImportantIcon/>
			</ListItemIcon>
			<ListItemText>Important</ListItemText>
		</ListItem>
		<Divider/>
		<ListSubheader>My lists</ListSubheader>
		{
			lists.data?lists.data.map((value, idx) => (
				<ListItem key={value.id} button component={Link} to={`/${value.id}`}>
					<ListItemText>{value.name}</ListItemText>
				</ListItem>
			)):""
		}
		
		<AddListDialog opener={open =>
		<ListItem button onClick={open}>
			<ListItemIcon><Add/></ListItemIcon>
			<ListItemText>New List</ListItemText>
		</ListItem>}/>
	</List>)
}

export default TodoListsDrawer;