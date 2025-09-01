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
 * PUT product to cart
 * @route PUT /api/v1/cart/
 * @param req - Express request object
 * @param res - Express response object
 * @returns The updated cart object
 */
const updateProductInCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getUserCartById(userId, guestId);
    if (!cart) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Cart not found',
      });
      return;
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (productIndex > -1) {
      // Update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        // Remove product if quantity is 0
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();

      res.status(200).json(cart);
    } else {
      res.status(404).json({
        code: 'NotFound',
        message: 'Product not found in cart',
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

export default updateProductInCart;
