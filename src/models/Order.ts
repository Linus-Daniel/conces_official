import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: IUser['_id'];
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);