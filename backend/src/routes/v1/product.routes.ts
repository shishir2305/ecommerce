/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
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

router.post('/', authenticate, requireAdminAuth, createProduct);
router.put('/:id', authenticate, requireAdminAuth, updateProduct);
router.delete('/:id', authenticate, requireAdminAuth, deleteProduct);

export default router;
