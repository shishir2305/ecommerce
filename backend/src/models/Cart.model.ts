/**
 * Node modules
 */
import { Document, Schema, model } from 'mongoose';

export interface ICartItem {
  productId: Schema.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  guestId: string;
  products: [ICartItem];
  totalPrice: number;
}

/**
 * Cart Item schema
 */
const cartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    name: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
  },
);

/**
 * Cart schema
 */
const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    guestId: {
      type: String,
      required: true,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export default model<ICart>('Cart', cartSchema);
