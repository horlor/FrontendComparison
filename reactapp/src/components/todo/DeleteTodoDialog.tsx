import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { useTodoDelete } from "../../hooks/TodoHooks";
import { Todo } from "../../models/Todo";
import { MutationErrorProps } from "../../util/ErrorUtil";
import ErrorDialog from "../common/ErrorDialog";

interface IProps{
	opener : (open:()=>void)=>JSX.Element,
	todo: Todo
}
const DeleteTodoDialog : React.FC<IProps> = props =>{
	const [open, setOpen] = useState(false);
	const mutation = useTodoDelete();

	return (
		<>
			{props.opener(()=>setOpen(true))}
			<Dialog open={open}>
				<DialogTitle>Deleting Todo</DialogTitle>
				<DialogActions>
					<Button onClick={()=> mutation.mutate(props.todo)}>Ok</Button>
					<Button onClick={()=> setOpen(false)}>Cancel</Button>
				</DialogActions>
			</Dialog>
			{mutation.isError && <ErrorDialog {...MutationErrorProps(mutation)}/>}
		</>
	);
}

export default DeleteTodoDialog;