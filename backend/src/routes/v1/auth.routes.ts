/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register.controller';
import login from '@/controllers/v1/auth/login.controller';

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
