import { hash, verify } from 'argon2'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { UserFields } from '../utils/user.utils'
import { generateToken } from './generate_token'

/**
 * @param req - The request object, containing data like parameters and the body sent by the client.
 * @param res - The response object, used to send back the desired response to the client.
 */
export const authorizationUser = asyncHandler(
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!user) {
			res.status(400)
			throw new Error('User not found')
		}

		const isValidUser = await verify(user.password, password)

		if (user && isValidUser) {
			const token = generateToken(user.id)
			res.json({ user, token })
		} else {
			res.status(401)
			throw new Error('Email and password are not correct')
		}
	}
)

/**
 * Handles user registration by creating a new user in the database with the provided details.
 * Before creating a new user, it checks if a user with the given email already exists to avoid duplicates.
 * If the user does not exist, it proceeds to create a new user with the hashed password and other details.
 * Upon successful creation, it generates a token for the user.
 *
 * @param req - The request object containing the user's registration details in the body.
 * @param res - The response object used to send the newly created user data and token back to the client.
 */
export const registerUser = asyncHandler(
	async (req: Request, res: Response) => {
		const { email, password, name, surname } = req.body

		// Check if a user with the provided email already exists
		const isHaveUser = await prisma.user.findUnique({
			where: {
				email
			}
		})

		// If user exists, throw an error
		if (isHaveUser) {
			res.status(400)
			throw new Error('User already exists')
		}

		// Create a new user with the hashed password and provided details
		const user = await prisma.user.create({
			data: {
				email,
				password: await hash(password),
				name,
				surname
			},
			select: UserFields
		})

		// Generate a token for the new user
		const userToken = generateToken(user.id)

		// Respond with the new user and their token
		res.json({ user, userToken })
	}
)
