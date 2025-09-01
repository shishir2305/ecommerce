/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getProductsFromCart from '@/controllers/v1/cart/get-cart-products.controller';
import addProductToCart from '@/controllers/v1/cart/add-product.controller';
import updateProductInCart from '@/controllers/v1/cart/update-product.controller';
import deleteProductFromCart from '@/controllers/v1/cart/delete-product.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';

/**
 * Models
 */

const router = Router();

router.get("/", getProductsFromCart)
router.post('/', authenticate, addProductToCart);
router.put('/', authenticate, updateProductInCart);
router.delete('/', authenticate, deleteProductFromCart);

export default router;
