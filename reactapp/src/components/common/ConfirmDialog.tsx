import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";

interface IProps{
	title: string;
	body: string | JSX.Element;
	opener: (open:()=>void)=> JSX.Element;
	onOk:  ()=>void;
	onCancel: ()=>void
}

const ConfirmDialog : React.FC<IProps> = props =>{
	const [open, setOpen]=useState(false);
	return (
		<>
			{props.opener(()=>setOpen(true))}
			{
				<Dialog open={open}>
					<DialogTitle>{props.title}</DialogTitle>
					<DialogContent>
						{props.body}
					</DialogContent>
					<DialogActions>
						<Button onClick={()=>{props.onOk(); setOpen(false);}}>Ok</Button>
						<Button onClick={()=>{props.onCancel(); setOpen(false);}}>Cancel</Button>
					</DialogActions>
				</Dialog>
			}
		</>
	);
}

export default ConfirmDialog;