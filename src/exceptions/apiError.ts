export class ApiError extends Error {
	statusCode: number;
	errors: any[];
	
	constructor(statusCode: number = 500, message: string, errors: any[] = []) {
		super(message);
		
		this.errors = errors;
		this.statusCode = statusCode;
	}
	
	static Unauthorized() {
		return new ApiError(401, "User wasnt authorized")
	}
	
	static BadRequest(message: string, errors: any[] = []) {
		return new ApiError(400, message, errors);
	}
}