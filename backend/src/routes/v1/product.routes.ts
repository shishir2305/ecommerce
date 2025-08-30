/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getAllProducts from '@/controllers/v1/product/get-all-products.controller';
import getProductById from '@/controllers/v1/product/get-product-by-id.controller';
import getBestSellerProducts from '@/controllers/v1/product/get-bestseller-product.controller';
import getSimilarProductsById from '@/controllers/v1/product/get-similar-products.controller';
import getNewArrivalProducts from '@/controllers/v1/product/get-new-arrival-products.controller';
import createProduct from '@/controllers/v1/product/create-product.controller';
import updateProduct from '@/controllers/v1/product/update-product.controller';
import deleteProduct from '@/controllers/v1/product/delete-product.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import requireAdminAuth from '@/middlewares/adminAuthenticate';

/**
 * Models
 */

const router = Router();

router.get('/', authenticate, requireAdminAuth, getAllProducts);
router.get(
  '/best-seller',
  authenticate,
  requireAdminAuth,
  getBestSellerProducts,
);
router.get(
  '/new-arrivals',
  authenticate,
  requireAdminAuth,
  getNewArrivalProducts,
);
router.get(
  '/similar/:id',
  authenticate,
  requireAdminAuth,
  getSimilarProductsById,
);
router.get('/:id', authenticate, requireAdminAuth, getProductById);
router.post('/', authenticate, requireAdminAuth, createProduct);
router.put('/:id', authenticate, requireAdminAuth, updateProduct);
router.delete('/:id', authenticate, requireAdminAuth, deleteProduct);

export default router;
