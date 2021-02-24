import { Children, createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../api/UserApi";

interface AuthState{
	loggedIn: boolean,
	username?: string,
	userId?: string,
}

const defValues = {
	loggedIn:false,
	username: undefined,
	userId: undefined
}

export const AuthContext = createContext<AuthState>(defValues)

const AuthProvider : React.FC = props =>{
	const [state, setState] = useState<AuthState>(defValues)
	const history = useHistory();
	useEffect(()=>{

		AuthService.setSessionListener((session)=>{
			setState(session);
			if(!session.loggedIn)
				history.push("login")
		})
		AuthService.init()
		return ()=>{AuthService.setSessionListener(s =>{})}
	},[])

	return(
		<AuthContext.Provider value={state}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;