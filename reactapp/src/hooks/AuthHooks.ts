import axios from "axios";
import { useContext, useState } from "react";
import AuthService, { Register } from "../api/UserApi"
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

export const useRegister = ()=>{
	const [status, setStatus] = useState("idle")
	async function register(data: {username: string, password: string, email: string}) {
		try{
			setStatus("loading")
			await Register(data);
			setStatus("success")
		}
		catch{
			setStatus("error")
		}
	}

	return {registerFun: register, status}
}

