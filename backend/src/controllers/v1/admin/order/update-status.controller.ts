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
 * Update Order Status
 * @route PATCH /api/v1/admin/orders/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated order
 */
const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Order not found',
      });
      return;
    }

    order.status = req.body.status || order.status;
    order.isDelivered =
      req.body.status === 'Delivered' ? true : order.isDelivered;
    order.deliveredAt =
      req.body.status === 'Delivered' ? new Date() : order.deliveredAt;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    logger.error(`Error updating order: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default updateOrderStatus;
