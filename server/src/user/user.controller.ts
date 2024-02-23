import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma'
import { UserFields } from '../utils/user.utils'

export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id
			},
			select: UserFields
		})

		res.json(user)
	}
)
