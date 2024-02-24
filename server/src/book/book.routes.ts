import express from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createNewBook,
	deleteAllRecords,
	deleteBook,
	getBook,
	getBooks,
	updateBook
} from './book.controller'

const router = express.Router()

router
	.route('/')
	.post(protect, createNewBook)
	.get(protect, getBooks)
	.delete(protect, deleteAllRecords)

router
	.route('/:id')
	.get(protect, getBook)
	.put(protect, updateBook)
	.delete(protect, deleteBook)

// router.route('/delete-all-books').delete(protect, deleteAllRecords)

export default router
