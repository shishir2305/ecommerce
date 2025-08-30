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
 * Get similar products for an ID
 * @route GET /api/v1/product/similar/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns The similar products object
 */
const getSimilarProductsById = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4); // Limit to 4 similar products

    res.status(200).json(similarProducts);
  } catch (err) {
    logger.error(`Error fetching product: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getSimilarProductsById;
