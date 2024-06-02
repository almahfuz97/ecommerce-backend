import { Schema, model } from "mongoose";
import { IInventory, IProduct, IVariant } from "./products.interface";

const VariantSchema = new Schema<IVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const InventorySchema = new Schema<IInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// main Schema
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: Number,
  category: { type: String, required: true },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [VariantSchema],
    required: true,
  },
  inventory: { type: InventorySchema, required: true },
});

export const ProductsModel = model<IProduct>("Product", ProductSchema);
