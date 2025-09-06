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
 * Get all products
 * @route GET /api/v1/admin/products
 * @param req - Express request object
 * @param res - Express response object
 * @returns The list of all products
 */
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    logger.error(`Error fetching products: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getAllProducts;
