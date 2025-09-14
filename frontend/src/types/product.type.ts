export interface ProductFilters {
  collection?: string;
  size?: string;
  color?: string;
  gender?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  search?: string;
  category?: string;
  material?: string;
  brand?: string;
  limit?: string;
}

export interface IProductImage {
  url: string;
  altText: string;
}

export interface IProductDimensions {
  length: number;
  width: number;
  height: number;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material: string;
  gender: "Male" | "Female" | "Unisex"; // restrict to allowed values
  images: IProductImage[];
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  numReviews: number;
  tags: string[];
  user: string; // likely a MongoDB ObjectId
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  dimensions: IProductDimensions;
  weight: number; // in grams
}
