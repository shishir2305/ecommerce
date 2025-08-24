/**
 * Node modules
 */
import jwt from 'jsonwebtoken';

/**
 * Custom modules
 */
import config from '@/config';

/**
 * Types
 */
import { Types } from 'mongoose';

export const generateAccessToken = (userId: Types.ObjectId, role: string) => {
  const payload = { userId, role };
  return jwt.sign(payload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
    subject: 'accessToken',
  });
};

export const generateRefreshToken = (userId: Types.ObjectId, role: string) => {
  const payload = { userId, role };
  return jwt.sign(payload, config.JWT_REFRESH_SECRET as string, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
    subject: 'refreshToken',
  });
};
