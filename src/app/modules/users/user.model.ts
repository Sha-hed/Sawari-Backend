/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
// import { Products } from './products.interface';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
// Define the Mongoose schema for products
export const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }, // Automatically manage `createdAt` and `updatedAt` fields
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  console.log(this);
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  console.log(this, 'after saving data');
  next();
});

// Create the Mongoose model
export const UserModel = model<TUser>('User', userSchema);
