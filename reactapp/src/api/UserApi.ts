import axios from "axios";
import { LoginResult, RegisterModel } from "../models/Auth";

class AuthServiceClass{
	private session?: LoginResult
	private  logoutListener : ()=>void = ()=>{}

	public init(){
		axios.defaults.headers.common["Authorization"] = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNTQyNmI4OS1hMmFhLTQ4ODktYTFiNC1hODNlZGRmOGYyMmEiLCJqdGkiOiJiODJjMDRmYS1hOTZmLTRiZWQtYTU3NC1hZTZhZjllNGJmYzkiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxNDA4MjU4NSwiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ.VCFVJKM3bL2sGcjkLrhzu3KMyjz7S8nMDoiopduIvo4";
	}

	public async login(username: string, password: string){
		let result = (await axios.post<LoginResult>("/api/users/login",{username: username, password: password})).data;
		this.session = result
		axios.defaults.headers.common["Authorization"] = "Bearer " + result.token;
	}

	public setLogoutListener(listener: ()=>void){
		this.logoutListener = listener;
	}

	public logout(){
		this.session = undefined;
		axios.defaults.headers.common["Authorization"] = undefined;
		this.logoutListener();
	}

	
}

const AuthService = new AuthServiceClass();

export default AuthService;

export async function Register(model: RegisterModel){
	await axios.post("/api/users/register", model);
}