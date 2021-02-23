import { Button } from "@material-ui/core";
import React from "react";
import { useLogin } from "../../hooks/AuthHooks";

const LogoutButton = () =>{
	const {logout} = useLogin()
 	return (
		<Button color="inherit" onClick={logout}>Logout</Button>
	)
}

export default LogoutButton;