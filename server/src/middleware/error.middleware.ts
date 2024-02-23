import { NextFunction, Request, Response } from 'express'

/**
 * Middleware for handling not found (404) errors.
 * This function should be placed after all other routes, as it catches any requests that don't match routes defined in the application.
 * It constructs an error with a message indicating the requested URL was not found and passes it to the next error handling middleware.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object. The status is set to 404 here but can be overridden by subsequent error handling middleware.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

/**
 * Error handling middleware for catching and responding to errors during request processing.
 * It sets the response status code based on the error thrown or defaults to 500 if the current status is 200.
 * It sends a JSON response with the error message and, if not in production, the error stack for debugging.
 * This middleware should be placed at the end of the middleware stack to catch any unhandled errors.
 *
 * @param {Error} error - The error object caught by this middleware.
 * @param {Request} req - The Express request object. Not used directly in the function, but necessary for the middleware signature.
 * @param {Response} res - The Express response object. Used to set the status code and send the error response.
 * @param {NextFunction} next - The next middleware function in the stack. Not used in this function, but necessary for the middleware signature.
 */
export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode)
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack
	})
}
