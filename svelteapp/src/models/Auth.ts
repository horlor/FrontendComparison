export interface RegisterModel{
	username: string,
	password: string,
	email: string,
}

export interface LoginModel{
	username: string,
	password: string,
}

export interface LoginResult{
	username: string,
	userId: string,
	expires: Date,
	token: string,
}

export interface Session{
	loggedIn: boolean, username?: string, userId?: string
}