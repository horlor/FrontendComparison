import { Box, IconButton, makeStyles, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useTodoAdd } from "../../hooks/TodoHooks";

const useStyles = makeStyles(theme => ({
	root:{
		margin: theme.spacing(1),
		padding: theme.spacing(1),
	},
	field:{
		width:"100%"
	}
}))


const AddTodoView : React.FC = props =>{
	const classes = useStyles();
	const mutation = useTodoAdd(null);
	const [title, setTitle] = useState("")
	return ( 
		<Paper className={classes.root}>
			<Box display="flex" >
				<IconButton
					type="submit"
					onClick={()=>{
						mutation.mutate({title:title, id:0, deadLine:"2021-03-23", important:false, done:false, listId: null, ownerId: 'b5426b89-a2aa-4889-a1b4-a83eddf8f22a'})
					}}
				>
					<Add/>
				</IconButton>
				<TextField
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}	
					className={classes.field}
				/>
			</Box>
		</Paper>
	);
}

export default AddTodoView;