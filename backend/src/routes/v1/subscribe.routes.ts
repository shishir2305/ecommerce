/**
 * Node modules
 */
import { Router } from 'express';
import multer from 'multer';

/**
 * Controllers
 */
import subscribeUser from '@/controllers/v1/subscriber/subscribe.controller';

/**
 * Middlewares
 */

const router = Router();

router.post('/', subscribeUser);

export default router;
