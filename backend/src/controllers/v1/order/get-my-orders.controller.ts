/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Order from '@/models/Order.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * GET a user's orders
 * @route GET /api/v1/orders/my-orders
 * @param req - Express request object
 * @param res - Express response object
 * @returns The user's orders
 */
const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;
  try {
    // Find most recent orders for the authenticated user
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    logger.error(`Error fetching user's orders: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getMyOrders;
