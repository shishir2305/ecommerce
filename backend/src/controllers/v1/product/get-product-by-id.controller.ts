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
 * Get product by ID
 * @route GET /api/v1/product/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The product object
 */
const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    logger.error(`Error fetching product: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getProductById;
