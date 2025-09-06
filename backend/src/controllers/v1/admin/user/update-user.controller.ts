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
 * Update a user
 * @route PUT /api/v1/admin/users/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated user
 */
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    logger.error(`Error updating user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default updateUser;
