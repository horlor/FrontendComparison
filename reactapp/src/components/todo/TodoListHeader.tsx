import { Box, Button, Dialog, DialogTitle, IconButton, makeStyles, Menu, MenuItem, TextField, Typography } from "@material-ui/core";
import { Cancel, Done, MoreHoriz } from "@material-ui/icons";
import React, { useState } from "react";
import { QueryObserverResult } from "react-query";
import { List } from "../../models/List";

const useStyles = makeStyles(theme => ({
	dialog:{
		padding: theme.spacing(1),
		minWidth:"360px"
	},
	input:{
		width:"100%"
	}
}))

interface IProps{
	list: QueryObserverResult<List,Error>
}

const TodoListHeader :React.FC<IProps>= props => {
	const list = props.list
	const classes = useStyles();
	const [anchorEl, setAnchor] = useState<HTMLElement>();
	const [edit, setEdit] = useState(false)
	const [title, setTitle] = useState<string>();
	return (
		<Box display="flex" alignContent="center">
				<Typography component="h1" variant="h3">{list.data?.name}</Typography>
			<Box flexGrow={1}/>
			<IconButton onClick={e => setAnchor(e.currentTarget)}><MoreHoriz/></IconButton>
			<Menu anchorEl={anchorEl} open={!!anchorEl} onClose={()=>setAnchor(undefined)}>
				{list.data?.builtIn?"":
				<>
					<MenuItem>Delete list</MenuItem>
					<MenuItem onClick={()=> {setEdit(true); setTitle(list.data?.name)}}>Change title of list</MenuItem>
				</>
				}
				<MenuItem>Delete all done items</MenuItem>
			</Menu>
			<Dialog open={edit} className={classes.dialog}>
				<DialogTitle>Editing the title of the list</DialogTitle>
				<form className={classes.dialog}>
					<TextField
						value={title}
						className={classes.input}
						onChange={e=> setTitle(e.target.value)}
					/>
					<Box display="flex" justifyContent="space-around">
						<Button>Save</Button>
						<Button onClick={()=>setEdit(false)}>Cancel</Button>
					</Box>
				</form>
			</Dialog>
		</Box>
	);
}

export default TodoListHeader;