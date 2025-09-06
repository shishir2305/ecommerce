/**
 * Node modules
 */
import { Router } from 'express';
const router = Router();

/**
 * Routes
 */
import authRoutes from '@/routes/v1/auth.routes';
import userRoutes from '@/routes/v1/user.routes';
import productRoutes from '@/routes/v1/product.routes';
import cartRoutes from '@/routes/v1/cart.routes';
import checkoutRoutes from '@/routes/v1/checkout.routes';
import uploadRoutes from '@/routes/v1/upload.routes';
import subscribeRoutes from '@/routes/v1/subscribe.routes';
import userAdminRoutes from '@/routes/v1/admin/user.routes';
import productAdminRoutes from '@/routes/v1/admin/product.routes';

/**
 * Root route
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'Ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/upload', uploadRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/admin/users', userAdminRoutes);
router.use('/admin/products', productAdminRoutes);

export default router;
