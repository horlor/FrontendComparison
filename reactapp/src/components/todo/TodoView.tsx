import { Accordion, AccordionDetails, Box, Card, Collapse, Divider, Icon, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Todo } from "../../models/Todo";
import Done from '@material-ui/icons/Done';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { CheckCircleOutlined, Delete, Edit, ExpandLess, ExpandMore } from "@material-ui/icons";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import EditTodoView from "./EditTodoView";

import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import DeleteTodoDialog from "./DeleteTodoDialog";
import { useTodo } from "../../hooks/TodoHooks";

const AccordionSummary = withStyles({
  root: {
	  paddingRight:"16px",
   "&.Mui-focused": {
      backgroundColor: "inherit"
    }
  }
})(MuiAccordionSummary);



interface IProps{
	todo: Todo
}

const useStylesForShort = makeStyles(theme =>({
	root:{
		margin: theme.spacing(1),
	},
	done:{
		color:"green"
	},
	icon:{
		margin:theme.spacing(0,1),
	},
	button:{
		margin:theme.spacing(0),
		padding:theme.spacing(0),
	}
}))

const ShortTodoView : React.FC<{todo:Todo}> = (props)=>{
	const classes = useStylesForShort()
	const todo = props.todo;
	const {doneMutation, importantMutation} = useTodo()
	return(
	<>
		<IconButton onClick={()=> doneMutation.mutate(todo)}>
					{todo.done?<CheckCircleOutlined className={classes.done}/>:<RadioButtonUncheckedIcon/>}
		</IconButton>
		<Box flexGrow={1}>
			<IconButton onClick={()=> importantMutation.mutate(todo)}><LabelImportantIcon style={todo.important?{color:"blue"}:{}} /></IconButton>
			<Typography variant="subtitle1" component="span">{todo.title}</Typography>
			<Box display="flex" alignItems="center">
				{todo.deadLine?
					<>
						<Icon className={classes.icon} fontSize="small"><EventAvailableIcon/></Icon>
						<Typography variant="caption" component="span">{dayjs(todo.deadLine).format("YYYY. MM. DD.")}</Typography>
					</>
					:""
				}

				<Box flexGrow={1}/>
				<EditTodoView todo={props.todo} 
				opener={ open => <IconButton className={classes.button} onClick={open}><Edit/></IconButton>}
				/>
				<DeleteTodoDialog todo={props.todo}
				opener={ open => <IconButton className={classes.button} onClick={open}><Delete/></IconButton> }
				/>
				
			</Box>
		</Box>
	</>
	);
}

const useStyles = makeStyles(theme =>({
	root:{
		margin: theme.spacing(1),
		padding: theme.spacing(1)
	},
	container:{
		paddingRight:theme.spacing(2)
	}
}))

const TodoView: React.FC<IProps> = props =>{
	const todo = props.todo;
	const [open, setOpen] = useState(false)
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Box display="flex">
				<ShortTodoView todo={todo}/>
				{todo.description?<IconButton onClick={()=>setOpen(!open)}>{open?<ExpandLess/>:<ExpandMore/>}</IconButton>:<Box width="48px" height="48px"/>}
			</Box>
			<Collapse in={open}>
				<Typography  style={{whiteSpace: 'pre-line'}}>{todo.description}</Typography>
			</Collapse>
		</Paper>
	);
}

export default TodoView;