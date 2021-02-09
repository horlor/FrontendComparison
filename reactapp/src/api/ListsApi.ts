import axios from "axios";

export async function GetLists(){
	return (await axios.get("/api/lists")).data;
}