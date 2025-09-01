/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Product from '@/models/Product.model';
import Cart, { ICart, ICartItem } from '@/models/Cart.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * Helpers
 */
import getUserCartById from '@/utils/get-cart-by-id';

/**
 * GET product from cart
 * @route GET /api/v1/cart/
 * @param req - Express request object
 * @param res - Express response object
 * @returns The cart object
 */
const getProductsFromCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { guestId, userId } = req.body;

  try {
    let cart = await getUserCartById(userId, guestId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({
        message: 'Cart not found',
      });
    }
  } catch (err) {
    logger.error(`Error adding product to cart: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getProductsFromCart;
