/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import createProduct from '@/controllers/v1/product/create-product.controller';

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

export default router;
