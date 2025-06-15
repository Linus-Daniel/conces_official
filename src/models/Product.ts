import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './Category';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory['_id'];
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type:String, ref:"Branch", required: true },
    branch:{ type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);