import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { AppError } from "../../models/Error";

interface IProps{
	error: AppError | null
}

const ErrorView: React.FC<IProps> = props=>{
	const error = props.error
	return (
		<Container maxWidth="md">
			<Paper>
				<Typography variant="h4" component="h2">{error?.name}</Typography>
				<Typography>{error?.message}</Typography>
			</Paper>
		</Container>
	);
}

export default ErrorView;