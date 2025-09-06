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
 * Delete an Order
 * @route DELETE /api/v1/admin/orders/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The deleted order
 */
const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Order not found',
      });
      return;
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting order: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default deleteOrder;
