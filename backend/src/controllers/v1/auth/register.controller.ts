/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import config from '@/config';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';

/**
 * Models
 */
import User from '@/models/User.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Registers a new user
 * @route POST /api/v1/auth/register
 * @param req - Express request object
 * @param res - Express response object
 * @returns A success message upon successful registration
 */
const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        message: 'User already exists',
      });
      return;
    }

    user = new User({ name, email, password });
    await user.save();

    // Generate access token and refresh token for new user
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });

    logger.info(`User registered successfully`, {
      username: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    logger.error(`Error registering user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default register;
