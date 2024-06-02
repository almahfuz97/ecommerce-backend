import { Request, Response } from "express";
import { ProductServices } from "./products.service";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products data retrieved from DB Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      data: error,
    });
  }
};
// add a product to database
const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.createProductToDB(req.body);
    res.status(200).json({
      success: true,
      message: "Products data added to DB Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      data: error,
    });
  }
};
export const ProductsController = {
  getAllProducts,
  createProduct,
};
