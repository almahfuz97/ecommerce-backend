import { Request, Response } from "express";
import { zodOrderValidation } from "./order.validation";
import { OrderServices } from "./order.services";
import { z } from "zod";
import { ProductsController } from "../products/products.controller";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedOrder = zodOrderValidation.parse(order);
    const result = await OrderServices.createOrderInDB(zodParsedOrder);
    const inventoryInfo = await ProductsController.updateInventoryWithOrder(
      result.productId,
      result.quantity,
    );
    if (inventoryInfo) {
      res.status(400).json({
        success: false,
        message: inventoryInfo,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
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

export const OrderController = {
  createOrder,
};
