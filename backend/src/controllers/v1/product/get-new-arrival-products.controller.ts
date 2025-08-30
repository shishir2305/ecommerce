/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Product from '@/models/Product.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Get new arrival products
 * @route GET /api/v1/products/new-arrivals
 * @param req - Express request object
 * @param res - Express response object
 * @returns The new arrival products array
 */
const getNewArrivalProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.status(200).json(newArrivals);
  } catch (err) {
    logger.error(`Error fetching new arrival products: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getNewArrivalProducts;
