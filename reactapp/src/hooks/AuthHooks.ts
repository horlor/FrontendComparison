import { useContext } from "react";
import AuthService from "../api/UserApi"
import {AuthContext} from "../components/auth/AuthContext";


export const useLogin = ()=>{
	const session = useAuth()

	async function login(username: string, password: string, remember: boolean = false){
		return await AuthService.login(username, password, remember);
	}

	async function logout(){
		AuthService.logout();
	}

	return {login, logout, loggedIn: session.loggedIn}
}

export const useAuth = ()=>{
	const session = useContext(AuthContext);

	return session;
}

