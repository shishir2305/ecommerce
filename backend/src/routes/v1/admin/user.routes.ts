/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Controllers
 */
import getAllUsers from '@/controllers/v1/admin/user/get-all-users.controller';
import createUser from '@/controllers/v1/admin/user/create-user.controller';
import updateUser from '@/controllers/v1/admin/user/update-user.controller';
import deleteUser from '@/controllers/v1/admin/user/delete-user.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import requireAdminAuth from '@/middlewares/adminAuthenticate';

/**
 * Models
 */

const router = Router();

router.get('/', authenticate, requireAdminAuth, getAllUsers);
router.post('/', authenticate, requireAdminAuth, createUser);
router.put('/:id', authenticate, requireAdminAuth, updateUser);
router.delete('/:id', authenticate, requireAdminAuth, deleteUser);

export default router;
