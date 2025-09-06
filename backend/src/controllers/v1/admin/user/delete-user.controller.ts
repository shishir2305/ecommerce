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
 * Delete a user
 * @route DELETE /api/v1/admin/users/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns A success message
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      return;
    }

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default deleteUser;
