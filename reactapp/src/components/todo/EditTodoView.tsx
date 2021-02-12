import { Box, Button, Dialog, Drawer, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
	description: string,
}

const EditTodoView : React.FC<IProps> = props =>{
	const {register, handleSubmit, control} = useForm({defaultValues:props.todo})
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<string | null>(props.todo.deadLine)
	const mutation = useTodoEdit()
	const classes = useStyles();

	function handleOpen(){
		setOpen(true)
	}

	function onSubmit(data: IFormData){
		mutation.mutate({...props.todo, ...data, deadLine:date})

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
			<DatePicker
			clearable
			label="Deadline"
			value={date}
			onChange={e => setDate(e?e.toISOString():null)}
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