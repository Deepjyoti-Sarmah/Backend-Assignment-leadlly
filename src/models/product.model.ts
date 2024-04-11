import mongoose, { Schema} from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stocks: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
    trim: true,
    index: true,
  },
  brand: {
    type: String,
    require: true,
    trim: true,
    index: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
