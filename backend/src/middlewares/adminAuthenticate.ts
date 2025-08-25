/**
 * Node modules
 */
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

/**
 * Custom modules
 */
import { verifyAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the Authorization header.
 *              If the token is valid, the user's ID is attached to the request object.
 *              Otherwise, it returns an appropriate error response.
 *
 * @param {Request} req - The Express request object. Expects a Bearer token in the Authorization header.
 * @param {Response} res - The Express response object used to send error responses if authentication fails.
 * @param {NextFunction} next - The Express next middleware function to pass control to the next middleware
 *
 * @returns {void}
 */
const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userId = req.userId;
  const userRole = req.userRole;

  // if (userRole === 'admin') {
  //   next();
  // } else {
  //   logger.warn(`Unauthorized access attempt by user ${userId}`);
  //   res.status(403).json({ message: 'Forbidden: Admins only' });
  // }
  console.log(userId);
  console.log(userRole);
};

export default requireAdminAuth;
