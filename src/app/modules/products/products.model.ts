import { Schema, model } from "mongoose";
import { IProduct } from "./products.interface";

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
});

export const ProductsModel = model<IProduct>("Product", ProductSchema);
