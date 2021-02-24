import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";

interface IProps{
	title?: string,
	content?: string,
	open: boolean,
	handleClose: ()=>void
}

const ErrorDialog : React.FC<IProps> = props=>{
	return (
		<Dialog open={props.open}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>{props.content}</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ErrorDialog;