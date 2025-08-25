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
 * Gets the current user
 * @route GET /api/v1/users/profile
 * @param req - Express request object
 * @param res - Express response object
 * @returns The current user object
 */
const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    logger.error(`Error getting current user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getCurrentUser;
