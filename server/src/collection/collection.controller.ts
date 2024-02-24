import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { addBookToCollectionFields } from '../utils/add-book.utils'
import { CollectionFields } from '../utils/collection.utils'

/**
 * @desc Creates a new collection in the database. It first checks if a collection with the same name already exists.
 *       If it does, the function responds with a 409 status code and an error message indicating the collection already exists.
 *       If no existing collection is found, it proceeds to create a new collection with the provided name and iconPath.
 *       The collection is associated with the user making the request.
 * @param {Request} req The request object containing the body with 'name' and 'iconPath' for the new collection,
 *                      and the authenticated user's ID under 'req.user.id'.
 * @param {Response} res The response object used to send back the newly created collection data as JSON.
 *                       In case the collection with the provided name already exists, it sends a 409 status code with an error message.
 * @returns {Promise<void>} A promise that resolves to void. The function either sends a JSON response with the newly created collection
 *                          or an error message indicating the collection already exists.
 */
export const createNewCollection = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user.id

		const { name, iconPath } = req.body

		const existingCollection = await prisma.collection.findUnique({
			where: {
				name: name
			}
		})

		if (existingCollection) {
			res.status(409).json({ error: 'The collection is already exist' })
		} else {
			const createCollection = await prisma.collection.create({
				data: {
					name,
					iconPath,
					user: { connect: { id: userId } }
				},
				select: CollectionFields
			})

			res.json(createCollection)
		}
	}
)

/**
 * @desc Retrieves collection from the database sends it back in the response.
 *       This function does not apply any filtering or pagination, which means it returns collection stored in the database.
 * @param {Request} req The request object. It is not utilized within this function but is included to adhere to the Express middleware pattern.
 * @param {Response} res The response object used to send back the collections data as JSON.
 * @returns {Promise<void>} A promise that resolves to void. The function does not return a value itself but
 *                          sends a JSON response containing unique collection.
 */
export const GetCollection = asyncHandler(
	async (req: Request, res: Response) => {
		const collection = await prisma.collection.findUnique({
			where: {
				id: +req.params.id
			},
			include: {
				CollectionBook: {
					include: {
						book: true
					}
				}
			}
		})
		if (!collection) {
			res.status(404).json({ message: 'Collection not found!' })
		}

		res.json(collection)
	}
)

/**
 * @desc Retrieves all collections from the database sends them back in the response.
 *       This function does not apply any filtering or pagination, which means it returns all collections stored in the database.
 * @param {Request} req The request object. It is not utilized within this function but is included to adhere to the Express middleware pattern.
 * @param {Response} res The response object used to send back the collections data as JSON.
 * @returns {Promise<void>} A promise that resolves to void. The function does not return a value itself but
 *                          sends a JSON response containing all collections.
 */
export const GetCollections = asyncHandler(
	async (req: Request, res: Response) => {
		const collections = await prisma.collection.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				CollectionBook: {
					include: {
						book: true
					}
				}
			}
		})

		if (collections.length === 0) {
			res.status(404).json({ message: 'Collections have not yet been made' })
		}

		const numberOfBooks = await Promise.all(
			collections.map(async collection => {
				const count = await prisma.collectionBook.count({
					where: {
						collectionId: collection.id
					}
				})
				return count
			})
		)

		res.json({ ...collections, numberOfBooks })
	}
)

/**
 * @desc Updates the details of an existing collection, including associated books.
 *       It is identified by the ID provided in the request parameters.
 * @param {Request} req The request object, containing:
 *        - `body` with `name`, `iconPath`, and `bookIds` to update the collection details and associated books.
 *        - `params` with the `id` of the collection to update.
 * @param {Response} res The response object, used to send the updated collection data back as JSON.
 *                       If the collection cannot be found, an error message is returned.
 * @returns {Promise<void>} A promise that, when resolved, sends a JSON response with the updated collection data
 *                          or an error message if the update is not successful.
 */
export const updateCollection = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, iconPath, bookIds } = req.body
		try {
			const collection = await prisma.collection.update({
				where: {
					id: +req.params.id // Ensure the ID is a number
				},
				data: {
					name,
					iconPath,
					CollectionBook: {
						set: bookIds.map((bookId: number) => ({ bookId })) // Update the associated books using their IDs
					}
				},
				include: {
					CollectionBook: {
						include: {
							book: true // Include the book details in the response
						}
					}
				}
			})

			res.json(collection)
		} catch (error) {
			res.status(404).json({ message: 'Collection not found!' })
		}
	}
)

/**
 * @desc Deletes a collection from the database, identified by the collection's ID in the request parameters.
 *       This action removes the collection record and potentially related data, depending on the database schema constraints.
 * @param {Request} req The request object, containing `params` with the collection ID as `id` to specify
 *                      which collection to delete.
 * @param {Response} res The response object used to confirm the deletion with a success message or an error message if the collection is not found.
 * @returns {Promise<void>} A promise that resolves to void. The function sends a JSON response with a success
 *                          message or an error message.
 */
export const deleteCollection = asyncHandler(
	async (req: Request, res: Response) => {
		try {
			const collection = await prisma.collection.delete({
				where: {
					id: +req.params.id
				}
			})
			res.json({
				message: `The collection is deleted successfully! ID: ${+req.params.id}, NAME: ${collection.name}`
			})
		} catch (error) {
			res.status(404).json({ error: 'The collection not found!' })
		}
	}
)

/**
 * @desc Adds a book to a collection by creating a new record in the `collectionBook` table.
 *       Before adding, it checks if the book is already added to the specified collection to prevent duplicates.
 * @param {Request} req The request object, containing `body` with `collectionId` and `bookId` to specify
 *                      which book to add to which collection.
 * @param {Response} res The response object used to send back the added book-collection relation data as JSON
 *                       or an error message if the book is already in the collection.
 * @returns {Promise<void>} A promise that resolves to void. The function sends a JSON response with the added
 *                          book-collection relationship or an error message.
 */
export const addBookToCollection = asyncHandler(
	async (req: Request, res: Response) => {
		const { collectionId, bookId } = req.body

		const existingAllocation = await prisma.collectionBook.findFirst({
			where: {
				collectionId,
				bookId
			}
		})

		if (existingAllocation) {
			res.status(409).json({ error: 'The book is already in the collection' })
		} else {
			const addBookToCollection = await prisma.collectionBook.create({
				data: {
					collectionId,
					bookId
				},
				select: addBookToCollectionFields
			})
			res.json(addBookToCollection)
		}
	}
)
