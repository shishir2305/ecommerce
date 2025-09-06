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
 * Updates a new checkout session
 * @route PUT /api/v1/checkout/:id/pay
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated checkout session object
 */
const updateCheckoutSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      res.status(404).json({
        message: 'Checkout session not found',
      });
      return;
    }

    if(paymentStatus === "paid"){
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();

        await checkout.save();

        res.status(200).json(checkout);
    }
    else{
        res.status(400).json({
            message: "Invalid payment status"
        })
    }

  } catch (err) {
    logger.error(`Error updating checkout session: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default updateCheckoutSession;
