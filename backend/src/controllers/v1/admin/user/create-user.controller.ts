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
 * Create a new user
 * @route POST /api/v1/admin/users
 * @param req - Express request object
 * @param res - Express response object
 * @returns The created user
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({
      code: 'BadRequest',
      message: 'All fields are required',
    });
    return;
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        code: 'BadRequest',
        message: 'User already exists',
      });
      return;
    }

    user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    logger.error(`Error creating user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default createUser;
