/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Subscriber from '@/models/Subscriber.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Subscribe a user to the newsletter
 * @route POST /api/v1/subscriber/subscribe
 * @param req - Express request object
 * @param res - Express response object
 * @returns The user's subscription status
 */
const subscribeUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: 'Email is required',
    });
    return;
  }
  try {
    // Check if the user email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      res.status(400).json({
        message: 'Email is already subscribed',
      });
      return;
    }

    // Create a new subscriber
    subscriber = new Subscriber({ email });

    await subscriber.save();

    res.status(201).json({
      message: 'Successfully subscribed to the newsletter',
    });
  } catch (err) {
    logger.error(`Error subscribing user: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default subscribeUser;
