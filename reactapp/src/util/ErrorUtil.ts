import { UseMutationResult } from "react-query";

export function MutationErrorProps(mutation: UseMutationResult<any,Error,any,any>){

	return {
		title: mutation.error?.name,
		content: mutation.error?.message,
		open: mutation.isError,
		handleClose: mutation.reset
	};
}