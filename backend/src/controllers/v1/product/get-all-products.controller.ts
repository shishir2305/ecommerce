/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Product from '@/models/Product.model';

/**
 * Types
 */
import type { Request, Response } from 'express';

interface IQuery {
  collection?: string;
  color?: string | { $in: string[] };
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string | { $in: string[] };
  size?: string | { $in: string[] };
  brand?: string | { $in: string[] };
  limit?: number;
  price?: { $gte?: number; $lte?: number };
  $or?: Array<{ [key: string]: any }>;
}

interface ISort {
  [key: string]: 1 | -1;
}

/**
 * Get all products
 * @route GET /api/v1/product/
 * @param req - Express request object
 * @param res - Express response object
 * @returns The all product object
 */
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query: IQuery = {};
    let sort: ISort = {};

    // Filter logic
    if (
      collection &&
      typeof collection === 'string' &&
      collection.toLowerCase() !== 'all'
    ) {
      query.collection = collection;
    }

    if (
      category &&
      typeof category === 'string' &&
      category.toLowerCase() !== 'all'
    ) {
      query.category = category;
    }

    if (material && typeof material === 'string') {
      query.material = { $in: material.split(',') };
    }

    if (brand && typeof brand === 'string') {
      query.brand = { $in: brand.split(',') };
    }

    if (size && typeof size === 'string') {
      query.size = { $in: size.split(',') };
    }

    if (color && typeof color === 'string') {
      query.color = { $in: [color] };
    }

    if (gender && typeof gender === 'string') {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort logic
    if (sortBy) {
      switch (sortBy) {
        case 'priceAsc':
          sort = { price: 1 };
          break;
        case 'priceDesc':
          sort = { price: -1 };
          break;
        case 'popularity':
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }
    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.status(200).json(products);
  } catch (err) {
    logger.error(`Error fetching products: ${err}`);
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err,
    });
  }
};

export default getAllProducts;
