import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import { zodProductSchema } from "./product.validation";
import { z } from "zod";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

// get a sinfle product
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const result = await ProductServices.getProductByIDFromDB(productId);
    if (result)
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    else {
      res.status(404).json({
        success: false,
        message: "No product available with this ID",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error,
    });
  }
};
// add a product to database
const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParsedProduct = zodProductSchema.parse(req.body);

    const result = await ProductServices.createProductToDB(zodParsedProduct);
    res.status(200).json({
      success: true,
      message: "Products created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors,
      });
    } else {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: error,
      });
    }
  }
};
export const ProductsController = {
  getAllProducts,
  createProduct,
  getProductById,
};
