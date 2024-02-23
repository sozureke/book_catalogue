import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { BookFields } from '../utils/book.utils'

/**
 * @desc Creates a new book in the database if a book with the same name does not exist.
 *       It first checks for the existence of a book with the provided name. If the book exists,
 *       it responds with a 409 Conflict status indicating the book already exists. Otherwise,
 *       it proceeds to create a new book record with the provided details.
 * @param {Request} req The request object, containing the body with book details.
 * @param {Response} res The response object used to send back the created book data or an error message.
 * @returns {Promise<void>} A promise that resolves to void. The function itself does not return a value but
 *                          either sends a JSON response with the created book or throws an error.
 */
export const createNewBook = asyncHandler(
	async (req: Request, res: Response) => {
		// Extract book details from the request body.
		const { name, author, description, category, image } = req.body

		// Check if a book with the same name already exists in the database.
		const isCreated = await prisma.book.findUnique({
			where: {
				name: name
			}
		})

		// If the book exists, send a 409 Conflict status and throw an error.
		if (isCreated) {
			res.status(409)
			throw new Error('The book is already exist')
		} else {
			// If the book does not exist, create a new book record in the database.
			const createBook = await prisma.book.create({
				data: {
					name,
					author,
					description,
					category,
					image
				},
				select: BookFields // Select specific fields to return in the response.
			})
			// Send the created book data as a JSON response.
			res.json(createBook)
		}
	}
)

/**
 * @desc Retrieves all books from the database and sends them back in the response.
 *       This function does not filter or paginate the results, so it returns all books stored in the database.
 * @param {Request} req The request object. It is not used in the function but is part of the function signature to match the Express middleware pattern.
 * @param {Response} res The response object used to send back the books data as JSON.
 * @returns {Promise<void>} A promise that resolves to void. The function itself does not return a value but
 *                          sends a JSON response with all books.
 */
export const getBooks = asyncHandler(async (req: Request, res: Response) => {
	// Retrieve all books from the database.
	const books = await prisma.book.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	})
	// Send the retrieved books data as a JSON response.
	res.json(books)
})

export const getBook = asyncHandler(async (req: Request, res: Response) => {
	// Retrieve all books from the database.
	const book = await prisma.book.findUnique({
		where: {
			id: +req.params.id
		}
	})
	// Send the retrieved books data as a JSON response.
	res.json(book)
})

/**
 * @desc Updates the details of an existing book, identified by the book's ID in the request parameters.
 *       It allows updating the name and iconPath of the book.
 * @param {Request} req The request object, containing `body` with `name` and `iconPath` for the update,
 *                      and `params` with the book ID as `id`.
 * @param {Response} res The response object used to send back the updated book data as JSON or an error
 *                       message if the book is not found.
 * @returns {Promise<void>} A promise that resolves to void. The function sends a JSON response with the updated
 *                          book or an error message.
 */
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
	const { name, author, description, category, image } = req.body
	try {
		const book = await prisma.book.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				author,
				description,
				category,
				image
			}
		})

		res.json(book)
	} catch (error) {
		res.status(404)
		throw new Error('The book not found!')
	}
})

/**
 * @desc Deletes a book from the database, identified by the book's ID in the request parameters.
 *       This action removes the book record and potentially related data, depending on the database schema constraints.
 * @param {Request} req The request object, containing `params` with the book ID as `id` to specify
 *                      which book to delete.
 * @param {Response} res The response object used to confirm the deletion with a success message or an error message if the book is not found.
 * @returns {Promise<void>} A promise that resolves to void. The function sends a JSON response with a success message or an error message.
 *
 */
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
	try {
		const book = await prisma.book.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({
			message: `The book is deleted successfully! ID: ${+req.params.id}, NAME: ${book.name}`
		})
	} catch (error) {
		res.status(404)
		throw new Error('The book not found!')
	}
})
