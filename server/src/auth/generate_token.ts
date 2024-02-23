import 'dotenv/config'
import jwt, { Secret } from 'jsonwebtoken'

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 *
 * This function creates a token that is signed with a secret key, which is
 * stored in an environment variable. The token includes an encoded payload
 * containing the user ID. It is configured to expire in 10 days.
 *
 * @param {number} userId - The unique identifier of the user for whom the token is being generated.
 * @returns {string} The generated JWT as a string.
 */
export const generateToken = (userId: number) => {
	// Ensure the ACCESS_TOKEN secret is available. If not, throw an error.
	if (!process.env.ACCESS_TOKEN) {
		throw new Error('ACCESS_TOKEN must be defined')
	}

	// Use jwt.sign to generate a new token.
	return jwt.sign(
		{
			// Payload of the token, containing the user ID.
			userId: userId
		},
		// The secret key used to sign the token, cast to Secret type for TypeScript.
		process.env.ACCESS_TOKEN as Secret,
		{
			// Set the token to expire in 10 days.
			expiresIn: '10d'
		}
	)
}
