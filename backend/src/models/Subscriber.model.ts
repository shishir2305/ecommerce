/**
 * Node modules
 */
import { Schema, model } from 'mongoose';

export interface ISubscriber {
  email: string;
  subscribedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ISubscriber>('Subscriber', subscriberSchema);
