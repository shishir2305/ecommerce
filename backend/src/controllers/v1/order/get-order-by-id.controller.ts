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
 * GET an order by ID
 * @route GET /api/v1/orders/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The user's order
 */
const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('user', 'name email');
    if (!order) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Order not found',
      });
      return;
    }
    res.status(200).json(order);
  } catch (err) {
    logger.error(`Error fetching user's order: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getOrderById;
