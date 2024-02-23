import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { Secret } from 'jsonwebtoken'
import { prisma } from '../prisma'
import { UserFields } from '../utils/user.utils'

interface TokenPayload {
	userId: number
}

export const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token

		if (req.headers.authorization?.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1]
		} else {
			res.status(401).json({ message: 'Unauthorized' })
			return
		}

		try {
			const decodedToken = jwt.verify(
				token,
				process.env.ACCESS_TOKEN as Secret
			) as TokenPayload

			if (!decodedToken.userId) {
				throw new Error('Token is invalid')
			}

			const userFound = await prisma.user.findUnique({
				where: {
					id: decodedToken.userId
				},
				select: UserFields
			})

			if (!userFound) {
				res.status(401).json({ message: 'Not authorized, token failed' })
				return
			} else {
				req.user = userFound
				next()
			}
		} catch (error) {
			res.status(401).json({ message: 'Not authorized, token failed' })
		}
	}
)
