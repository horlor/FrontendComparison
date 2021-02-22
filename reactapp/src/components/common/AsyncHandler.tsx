
interface IProps{
	isError?:boolean,
	isLoading?:boolean,
	loader?: JSX.Element,
	errorView?: JSX.Element,
}

const AsyncHandler : React.FC<IProps> = props => {
	return (
		<>
		{
			props.isError?
			props.errorView:
			props.isLoading?
			props.loader:
			props.children
		}
		</>
	);
}

export default AsyncHandler;