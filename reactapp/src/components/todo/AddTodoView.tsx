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

	function submit(){
		mutation.mutate({title:title, id:0, deadLine:null, important:false, done:false, listId: null, ownerId:""})
		setTitle("")
	}
	return ( 
		<Paper className={classes.root}>
			<Box display="flex" >
				<IconButton
					type="submit"
					onClick={submit}
				>
					<Add/>
				</IconButton>
				<TextField
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}	
					className={classes.field}
					onKeyDown={e => {
						if(e.key === "Enter")
							submit();
					}}
				/>
			</Box>
		</Paper>
	);
}

export default AddTodoView;