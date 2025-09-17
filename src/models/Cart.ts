import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";
import { IUser } from "./User";

export interface ICartItem {
  product: IProduct["_id"];
  quantity: number;
  price: number;
  chapter: string;
}

export interface ICart extends Document {
  user: IUser["_id"];
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        chapter: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Calculate total before saving
CartSchema.pre<ICart>("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", CartSchema);
