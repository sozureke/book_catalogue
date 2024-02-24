import express from 'express'
import morgan from 'morgan'

import 'dotenv/config'
import { prisma } from './prisma'

import authRoutes from './auth/auth.routes'
import bookRoutes from './book/book.routes'
import collectionRoutes from './collection/collection.routes'
import googleBooksRoutes from './google_books/google-book.routes'
import userRoutes from './user/user.routes'

import { errorHandler, notFound } from './middleware/error.middleware'

// initialize express
const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev')) // morgan using for logging data

	app.use(express.json()) // convert data to JSON

	// routes
	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/books', bookRoutes)
	app.use('/api/collections', collectionRoutes)
	app.use('/api/get-books', googleBooksRoutes)

	// middleware
	app.use(notFound)
	app.use(errorHandler)

	// port
	const PORT = process.env.PORT || 3000

	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (error: Error) => {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	})
