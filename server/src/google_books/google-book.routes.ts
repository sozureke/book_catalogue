import express from 'express'
import { getBooks } from './google-books.controller'

const router = express.Router()

router.route('/').post(getBooks)

export default router
