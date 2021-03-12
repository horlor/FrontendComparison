import { Box, IconButton, makeStyles, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useTodoAdd } from "../../hooks/TodoHooks";
import { MutationErrorProps } from "../../util/ErrorUtil";
import ErrorDialog from "../common/ErrorDialog";

const useStyles = makeStyles(theme => ({
	root:{
		margin: theme.spacing(1),
		padding: theme.spacing(1),
	},
	field:{
		width:"100%"
	}
}))

interface IProps{
	listId: string | null
}


const AddTodoView : React.FC<IProps> = props =>{
	const classes = useStyles();
	const mutation = useTodoAdd(props.listId);
	const [title, setTitle] = useState("")

	function submit(){
		mutation.mutate({title:title, id:null, deadLine:null, important:false, done:false, listId: props.listId, ownerId:""})
		setTitle("")
	}
	return ( 
		<Paper className={classes.root}>
			<Box display="flex" >
				<IconButton
					onClick={submit}
				>
					<Add/>
				</IconButton>
				<TextField
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}	
					className={classes.field}
					placeholder="What do I have to do? (Press Enter to save)"
					onKeyDown={e => {
						if(e.key === "Enter")
							submit();
					}}
				/>
			</Box>
			{ mutation.isError && <ErrorDialog
				{...MutationErrorProps(mutation)}
			/>}
		</Paper>
	);
}

export default AddTodoView;