import { Box, Button, Dialog, Drawer, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTodoEdit } from "../../hooks/TodoHooks";
import { Todo } from "../../models/Todo";

const useStyles = makeStyles(theme => ({
	root:{
		
	},
	form:{
		padding: theme.spacing(1),
		width:"30%",
		minWidth:"400px",
		display:"flex",
		flexDirection:"column"
	},
	field:{
		width:"100%"
	}
}))

interface IProps{
	opener : (open:()=>void)=>JSX.Element,
	todo: Todo
}

interface IFormData{
	name:string,
	deadline:string,
	description: string,
}

function DateToInput(date: string | undefined | null){
	if(!date)
		return ""
	const dateObj = new Date(Date.parse(date));
	const day = dateObj.getDate()
	const month = dateObj.getMonth()
	const year = dateObj.getFullYear()
	return `${year}-${month<10?'0':''}${month}-${day<10?'0':''}${day}`

}

const EditTodoView : React.FC<IProps> = props =>{
	const {register, handleSubmit} = useForm({defaultValues:props.todo})
	const [open, setOpen] = useState(false);
	const mutation = useTodoEdit()
	const classes = useStyles();

	function handleOpen(){
		setOpen(true)
	}

	function onSubmit(data: IFormData){
		mutation.mutate({...props.todo, ...data})
		setOpen(false);
	}

	return (
		<>
		{props.opener(handleOpen)}
		<Dialog open={open} className={classes.root}>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<TextField
				label="Todo"
				name="title"
				defaultValue={props.todo.title}
				className={classes.field}
				inputRef={register}
			/>
			<input
				type="date"
				className={classes.field}
				name="deadLine"
				//ref={register}
			/>
			<TextField
				label="Notes"
				multiline
				className={classes.field}
				name="description"
				defaultValue={props.todo.title}
				rowsMax={5}
				inputRef={register}
			/>
			<Box display="flex" justifyContent="space-between">
				<Button
					type="submit"
				>
					Save
				</Button>
				<Button
				onClick={()=>setOpen(false)}
				>
					Cancel
				</Button>
			</Box>
			</form>
		</Dialog>
		</>
	);
}

export default EditTodoView;