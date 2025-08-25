/**
 * Custom modules
 */
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';

/**
 * Models
 */
import User from '@/models/User.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Logs in a user
 * @route POST /api/v1/auth/login
 * @param req - Express request object
 * @param res - Express response object
 * @returns A success message upon successful login
 */
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    // Generate access token and refresh token for user
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    console.log(`Generated tokens: ${accessToken} ${refreshToken}`);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });

    logger.info(`User logged in successfully`, {
      username: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    logger.error(`Error logging in user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default login;
