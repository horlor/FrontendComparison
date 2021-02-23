import axios from "axios";
import { LoginResult, RegisterModel, Session } from "../models/Auth";

class AuthServiceClass{
	private session?: LoginResult
	private  sessionListener : (session: Session)=>void = ()=>{}

	public init(){
		var local = localStorage.getItem("todo-session");
		if(local)
			this.session = JSON.parse(local)
		
		else{
			let session = sessionStorage.getItem("todo-session")
			if(session)
				this.session = JSON.parse(session)
		}
		axios.defaults.headers.common["Authorization"] = "Bearer " + this.session?.token;
		if(this.session)
			this.sessionListener({loggedIn: true, userId:this.session.userId, username: this.session.username })
		console.log(this.session)
	}

	public async login(username: string, password: string, remember: boolean = false){
		try{
			let result = (await axios.post<LoginResult>("/api/users/login",{username: username, password: password})).data;
			this.session = result
			localStorage.removeItem("todo-session")
			sessionStorage.removeItem("todo-session")
			if(remember)
				localStorage.setItem("todo-session",JSON.stringify(this.session));
			sessionStorage.setItem("todo-session",JSON.stringify(this.session))
			axios.defaults.headers.common["Authorization"] = "Bearer " + result.token;
			this.sessionListener({loggedIn: true, userId:this.session.userId, username: this.session.username })
			return true;
		}
		catch(ex){
			return false;
		}
	}

	public setSessionListener(listener: (session: Session)=>void){
		this.sessionListener = listener;
	}

	public logout(){
		this.session = undefined;
		axios.defaults.headers.common["Authorization"] = undefined;
		localStorage.removeItem("todo-session")
		sessionStorage.removeItem("todo-session")
		this.sessionListener({loggedIn: false});
	}

	
}

const AuthService = new AuthServiceClass();

export default AuthService;

export async function Register(model: RegisterModel){
	await axios.post("/api/users/register", model);
}