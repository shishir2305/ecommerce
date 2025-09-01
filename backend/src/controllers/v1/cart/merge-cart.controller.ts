/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Cart from '@/models/Cart.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

/**
 * POST merge product from guest cart
 * @route POST /api/v1/cart/merge
 * @param req - Express request object
 * @param res - Express response object
 * @returns The cart object
 */
const getProductsFromCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req?.userId;
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: userId });

    if (guestCart) {
      if (!guestCart.products.length) {
        res.status(200).json({
          message: 'Guest cart is empty',
        });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.quantity === guestItem.quantity &&
              item.size === guestItem.size,
          );

          if (productIndex > -1) {
            // If the items exist in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );

        await userCart.save();

        // Remove the guest cart after merging
        await Cart.findOneAndDelete({ guestId });

        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        if (userId) {
          guestCart.user = userId;
          guestCart.guestId = undefined;
          await guestCart.save();
          res.status(200).json(guestCart);
        }
      }
    } else {
      if (userCart) {
        // Guest cart has already been merged, return user cart
        res.status(200).json(userCart);
      }
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
