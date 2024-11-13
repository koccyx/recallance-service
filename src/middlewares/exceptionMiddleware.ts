import { ApiError } from "@/exceptions/apiError";

export function exceptionMiddleware(err, req, res, next) {
	console.log(err);
	
	if(err instanceof ApiError) {
		return res.status(err.statusCode).send({
			message: err.message,
			errors: err.errors
		});
	}
	
	return res.status(500).send({message: "Unexpected error"});
}