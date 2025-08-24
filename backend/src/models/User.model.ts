/**
 * Node modules
 */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  matchPassword: (password: string) => Promise<boolean>;
}

/**
 * User schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [100, 'Email must be at most 100 characters long'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['customer', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'customer',
    },
  },
  {
    timestamps: true,
  },
);

// Password Hash middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model<IUser>('User', userSchema);
