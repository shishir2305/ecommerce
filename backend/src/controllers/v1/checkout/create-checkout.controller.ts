/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Checkout from '@/models/Checkout.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Creates a new checkout session
 * @route POST /api/v1/checkout
 * @param req - Express request object
 * @param res - Express response object
 * @returns The created checkout session object
 */
const createCheckoutSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req;
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    res.status(400).json({
      message: 'No items in checkout',
    });
  }
  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: userId,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: 'Pending',
      isPaid: false,
    });

    res.status(201).json(newCheckout);
  } catch (err) {
    logger.error(`Error creating checkout session: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default createCheckoutSession;
