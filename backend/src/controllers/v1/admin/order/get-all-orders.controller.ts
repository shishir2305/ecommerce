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
 * Get all Orders
 * @route GET /api/v1/admin/orders
 * @param req - Express request object
 * @param res - Express response object
 * @returns The list of all Orders
 */
const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    logger.error(`Error fetching orders: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getAllOrders;
