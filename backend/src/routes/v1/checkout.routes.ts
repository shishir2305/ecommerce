/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import createCheckoutSession from '@/controllers/v1/checkout/create-checkout.controller';
import updateCheckoutSession from '@/controllers/v1/checkout/update-checkout.controller';
import finalizeCheckoutSession from '@/controllers/v1/checkout/finalize-checkout.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';

const router = Router();

router.post('/', authenticate, createCheckoutSession);
router.put('/:id/pay', authenticate, updateCheckoutSession);
router.put('/:id/finalize', authenticate, finalizeCheckoutSession);

export default router;
