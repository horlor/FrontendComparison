import axios from "axios";

class AuthServiceClass{
	public init(){
		axios.defaults.headers.common["Authorization"] = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNTQyNmI4OS1hMmFhLTQ4ODktYTFiNC1hODNlZGRmOGYyMmEiLCJqdGkiOiJiODJjMDRmYS1hOTZmLTRiZWQtYTU3NC1hZTZhZjllNGJmYzkiLCJ1c2VybmFtZSI6ImxvcmFudCIsImV4cCI6MTYxNDA4MjU4NSwiaXNzIjoiVG9kbyIsImF1ZCI6IlRvZG8tdXNlcnMifQ.VCFVJKM3bL2sGcjkLrhzu3KMyjz7S8nMDoiopduIvo4";
	}
}

const AuthService = new AuthServiceClass();

export default AuthService;