/**
 * Node modules
 */
import { Document, Schema, model } from 'mongoose';

export interface ICheckoutItem {
  productId: Schema.Types.ObjectId;
  name: string;
  image: string;
  price: number;
}

export interface ICheckout extends Document {
  user: Schema.Types.ObjectId;
  checkoutItems: [ICheckoutItem];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  paymentStatus: string;
  paymentDetails: Schema.Types.Mixed;
  isFinalized: boolean;
  finalizedAt: Date;
}

/**
 * Checkout Item schema
 */
const checkoutItemSchema = new Schema<ICheckoutItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

/**
 * Checkout schema
 */
const checkoutSchema = new Schema<ICheckout>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
    paymentDetails: {
      type: Schema.Types.Mixed, // Store payment-related details(transaction ID, paypal response)
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default model<ICheckout>('Checkout', checkoutSchema);
