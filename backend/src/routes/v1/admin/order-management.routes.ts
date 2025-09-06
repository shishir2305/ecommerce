/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getAllOrders from '@/controllers/v1/admin/order/get-all-orders.controller';
import updateOrderStatus from '@/controllers/v1/admin/order/update-status.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import requireAdminAuth from '@/middlewares/adminAuthenticate';

/**
 * Models
 */

const router = Router();

router.get('/', authenticate, requireAdminAuth, getAllOrders);
router.patch('/:id', authenticate, requireAdminAuth, updateOrderStatus);

export default router;
