/**
 * Node modules
 */
import { Router } from 'express';
import multer from 'multer';

/**
 * Controllers
 */
import uploadImage from '@/controllers/v1/upload/upload-image.controller';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';

const router = Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authenticate, upload.single('image'), uploadImage);

export default router;
