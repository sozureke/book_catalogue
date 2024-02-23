import express from 'express'
import { protect } from '../middleware/auth.middleware'
import { getUserProfile } from './user.controller'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)

export default router
