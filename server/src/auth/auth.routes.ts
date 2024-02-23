import express from 'express'
import { authorizationUser, registerUser } from './auth.controller'

const router = express.Router()

router.route('/login').post(authorizationUser)
router.route('/register').post(registerUser)

export default router
