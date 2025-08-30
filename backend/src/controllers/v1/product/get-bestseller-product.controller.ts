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
 * Get best seller product
 * @route GET /api/v1/products/best-seller
 * @param req - Express request object
 * @param res - Express response object
 * @returns The best seller product object
 */
const getBestSellerProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    res.status(200).json(bestSeller);
  } catch (err) {
    logger.error(`Error fetching best seller products: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getBestSellerProducts;
