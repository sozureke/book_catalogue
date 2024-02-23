import express from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createNewBook,
	deleteBook,
	getBook,
	getBooks,
	updateBook
} from './book.controller'

const router = express.Router()

router.route('/').post(protect, createNewBook).get(protect, getBooks)

router
	.route('/:id')
	.get(protect, getBook)
	.put(protect, updateBook)
	.delete(protect, deleteBook)

export default router
