/**
 * Node modules
 */
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

/**
 * Custom modules
 */
import config from '@/config';

/**
 * Types
 */
import type { Request, Response } from 'express';

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

/**
 * POST an image to cloudinary
 * @route POST /api/v1/upload
 * @param req - Express request object
 * @param res - Express response object
 * @returns The uploaded image URL
 */
const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: 'No file uploaded',
      });
      return;
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: 'Error uploading image',
            error,
          });
          return;
        }

        if (!result) {
          res.status(500).json({
            message: 'Upload failed - no result returned',
          });
          return;
        }

        res.status(200).json({
          message: 'Image uploaded successfully',
          url: result.secure_url,
        });
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    res.status(500).json({
      message: 'Error uploading image',
      error: err,
    });
  }
};

export default uploadImage;