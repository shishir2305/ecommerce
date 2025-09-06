/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getMyOrders from '@/controllers/v1/order/get-my-orders.controller';
import getOrderById from '@/controllers/v1/order/get-order-by-id.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';

const router = Router();

router.get('/', authenticate, getMyOrders);
router.get('/:id', authenticate, getOrderById);

export default router;
