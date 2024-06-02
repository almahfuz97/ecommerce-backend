import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import { zodProductSchema } from "./product.validation";
import { z } from "zod";

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
            })
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
};
