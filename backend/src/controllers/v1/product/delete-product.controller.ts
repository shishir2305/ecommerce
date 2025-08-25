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
 * Deletes a product
 * @route DELETE /api/v1/product/:id
 * @param req - Express request object
 * @param res - Express response object
 * @returns A success message
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Product not found',
      });
      return;
    }

    // Delete product
    await product.deleteOne();

    res.status(200).json({
      code: 'Success',
      message: 'Product deleted successfully',
    });
  } catch (err) {
    logger.error(`Error deleting product: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default deleteProduct;
