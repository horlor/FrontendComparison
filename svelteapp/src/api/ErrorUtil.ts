import type { AppError } from "../models/Error";

export function parseError(e: any): AppError {
	console.log(e)
	return {
		code:0,
		name:"Unknown error",
		message:"An unidentifieble error happened, try later or contact the site's administrator."
	}
}