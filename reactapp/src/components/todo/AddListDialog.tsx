import { Box, Button, Dialog, DialogTitle, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react"
import { useListAdd } from "../../hooks/TodoHooks";

interface IProps{
	opener: (open: ()=> void)=> JSX.Element
}

const useStyles = makeStyles(theme =>({
	dialog:{
		minWidth:"360px"
	},
	form:{
		display:"flex",
		minWidth:"360px",
		flexDirection:"column",
		padding:theme.spacing(1)
	},
	field:{
		width:"100%",
	}
}))

const AddListDialog : React.FC<IProps> = props =>{
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const classes = useStyles();
	const mutation = useListAdd();
	const handleClose = ()=>{
		setOpen(false)
	}
	function submit(){
		mutation.mutate({id:0, name:title});
		setOpen(false)
	}
	return(
		<>
			{props.opener(()=> setOpen(true))}
			<Dialog open={open} className={classes.dialog}>
				<DialogTitle>Creating a new list</DialogTitle>
				<form className={classes.form}>
					<TextField
						name="title"
						placeholder="Title"
						className={classes.field}
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button onClick={submit}>Ok</Button>
						<Button onClick={handleClose} >Cancel</Button>
					</Box>
				</form>
			</Dialog>
		</>
	);
}

export default AddListDialog;