import axios from 'axios'
import { Request, Response } from 'express'
import { prisma } from '../prisma'
import { IBookData } from './google-book.types'

export const createBook = async (bookData: IBookData) => {
	const isCreated = await prisma.book.findUnique({
		where: {
			name: bookData.name
		}
	})
	if (isCreated) {
		throw new Error('The book is already exist')
	}
	const createBook = await prisma.book.create({
		data: {
			name: bookData.name,
			author: bookData.author,
			description: bookData.description,
			category: bookData.category,
			image: bookData.image,
			links: bookData.links
		}
	})
	return createBook
}

export const getBooks = async (req: Request, res: Response) => {
	const keyword = 'React'
	const category = 'Programming'
	const maxResults = 40
	const apiKey = process.env.GOOGLE_API_KEY
	const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(String(keyword))}+subject:${category}&maxResults=${maxResults}&key=${apiKey}`

	try {
		const response = await axios.get(url)
		const booksData: IBookData[] = response.data.items.map((item: any) => ({
			name: item.volumeInfo.title,
			author: item.volumeInfo.authors || ['Author Unknown'],
			description: item.volumeInfo.description || 'No description available',
			category: item.volumeInfo.categories || ['No category'],
			image: item.volumeInfo.imageLinks?.thumbnail || 'No image available',
			links: [item.volumeInfo.previewLink || 'No link available']
		}))

		const addBookToDatabase = booksData.map(async bookData => {
			try {
				return await createBook(bookData)
			} catch (error) {
				console.error(`Error adding book: ${bookData.name}`, error)
				return null
			}
		})
		await Promise.all(addBookToDatabase)
		res.status(201).json({ message: 'Books added successfully' })
	} catch (error) {
		console.error('Error fetching data from Google Books API', error)
		res.status(500).json({
			message: 'Error fetching data from Google Books API',
			error: error instanceof Error ? error.message : error
		})
	}
}
