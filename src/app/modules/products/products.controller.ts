import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import { zodProductSchema } from "./product.validation";
import { z } from "zod";
import { isEmpty, isEqual, pick } from "lodash";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.searchTerm;
    if (!searchQuery) {
      const result = await ProductServices.getProductsFromDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    } else {
      if (isEmpty(searchQuery))
        return res.json({ success: false, message: "No queary data" });
      searchProducts(res, req, searchQuery.toString());
    }
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
// update a product by id
const updateProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const zodPartialParsedData = zodProductSchema.partial().parse(req.body);
    const currentData = await ProductServices.getProductByIDFromDB(productId);

    const currentDataSubset = pick(
      currentData?.toObject(),
      Object.keys(zodPartialParsedData),
    );

    if (isEqual(currentDataSubset, zodPartialParsedData)) {
      return res.status(200).json({
        success: true,
        message: "No Changes to Update",
      });
    }
    const result = await ProductServices.updateProductInDB(
      productId,
      zodPartialParsedData,
    );
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
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
// delete a product by id
const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
      error,
    });
  }
};

// search  product by name field and description field
const searchProducts = async (
  res: Response,
  req: Request,
  searchQuery: string,
) => {
  try {
    const result = await ProductServices.searchProductsFromDB(searchQuery);
    console.log(result);
    if (isEmpty(result))
      return res.json({ success: true, message: "No product found" });
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchQuery}' fetched successfully!`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(5000).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
export const ProductsController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductByID,
  deleteProductByID,
  searchProducts,
};
