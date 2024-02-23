import express from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	GetCollection,
	GetCollections,
	addBookToCollection,
	createNewCollection,
	deleteCollection,
	updateCollection
} from './collection.controller'

const router = express.Router()

router
	.route('/')
	.post(protect, createNewCollection)
	.get(protect, GetCollections)

router
	.route('/:id')
	.get(protect, GetCollection)
	.put(protect, updateCollection)
	.delete(protect, deleteCollection)

router.route('/add').post(protect, addBookToCollection)

export default router
