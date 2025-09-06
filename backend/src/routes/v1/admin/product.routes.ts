/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getAllProducts from '@/controllers/v1/admin/product/get-all-products.controller';

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

export default router;
