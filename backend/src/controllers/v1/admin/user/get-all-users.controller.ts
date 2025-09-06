/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/User.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Get all users
 * @route GET /api/v1/admin/users
 * @param req - Express request object
 * @param res - Express response object
 * @returns The list of all users
 */
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    logger.error(`Error fetching users: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getAllUsers;
