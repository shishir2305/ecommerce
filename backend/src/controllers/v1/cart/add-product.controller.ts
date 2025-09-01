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
 * POST product to cart
 * @route POST /api/v1/cart/
 * @param req - Express request object
 * @param res - Express response object
 * @returns The product object
 */
const addProductToCart = async (req: Request, res: Response): Promise<void> => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Product not found',
      });
      return;
    }

    // Determine if the user is logged in or guest
    let cart = await getUserCartById(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        // If the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      res.status(201).json(newCart);
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

export default addProductToCart;
