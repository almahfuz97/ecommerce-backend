import { ProductsModel } from "./product.model";

const getProductsFromDB = async () => {
  const result = await ProductsModel.find();
  return result;
};
// get a single product by id from db
const getProductByIDFromDB = async (productID: string) => {
  const result = await ProductsModel.findById(productID);
  return result;
};
//  add products to db
const createProductToDB = async (product: object) => {
  const result = await ProductsModel.create(product);
  return result;
};

export const ProductServices = {
  getProductsFromDB,
  createProductToDB,
  getProductByIDFromDB,
};
