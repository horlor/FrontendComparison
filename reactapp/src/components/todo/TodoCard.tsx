import { Box, Card, Divider, Icon, IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Todo } from "../../models/Todo";
import Done from '@material-ui/icons/Done';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { CheckCircleOutlined } from "@material-ui/icons";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

interface IProps{
	todo: Todo
}

const useStyles = makeStyles(theme =>({
	root:{
		margin: theme.spacing(1),
	},
	done:{
		color:"green"
	},

}))

const TodoCard: React.FC<IProps> = props =>{
	const todo = props.todo;
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<Box display="flex" flexDirection="row">
				<IconButton>
					{todo.done?<CheckCircleOutlined className={classes.done}/>:<RadioButtonUncheckedIcon/>}
				</IconButton>
				<Box flexGrow={1}>
					<Typography variant="subtitle1">{todo.title}</Typography>
					<Icon fontSize="small"><EventAvailableIcon/></Icon>
					<Typography variant="caption" component="span">{todo.deadLine?new Date(Date.parse(todo.deadLine)).toLocaleDateString():""}</Typography>
					<Divider/>
					<Typography>{todo.description}</Typography>
				</Box>
			</Box>
		</Card>
	);
}

export default TodoCard;