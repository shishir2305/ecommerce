/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Checkout from '@/models/Checkout.model';
import Order from '@/models/Order.model';
import Cart from '@/models/Cart.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Finalizes a checkout session and convert it to an order after payment confirmation
 * @route PUT /api/v1/checkout/:id/finalize
 * @param req - Express request object
 * @param res - Express response object
 * @returns The finalized checkout session object
 */
const finalizeCheckoutSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      res.status(404).json({
        message: 'Checkout session not found',
      });
      return;
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: 'paid',
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();

      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });

      res.status(200).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({
        message: 'Checkout session has already been finalized',
      });
    } else {
      res.status(400).json({
        message: 'Checkout session is not paid',
      });
    }
  } catch (err) {
    logger.error(`Error finalizing checkout session: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default finalizeCheckoutSession;
