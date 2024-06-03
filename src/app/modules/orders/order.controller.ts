import { Request, Response } from "express";
import { zodOrderValidation } from "./order.validation";
import { OrderServices } from "./order.services";
import { z } from "zod";
import { ProductsController } from "../products/products.controller";

// creating order with inventory update
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedOrder = zodOrderValidation.parse(order);

    const inventoryInfo = await ProductsController.inventoryChecking(
      zodParsedOrder.productId,
      zodParsedOrder.quantity,
    );
    if (inventoryInfo) {
      return res.status(400).json({
        success: false,
        message: inventoryInfo,
      });
    } else {
      const result = await OrderServices.createOrderInDB(zodParsedOrder);
      await ProductsController.updateInventoryWithOrder(
        result.productId,
        result.quantity,
      );
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

// get all orders,
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    if (!email) {
      try {
        const result = await OrderServices.getAllOrdersFromDB();
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully!",
          data: result,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
          data: error,
        });
      }
    } else {
      await getOrderForUserEmail(req, res, email.toString());
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
      error,
    });
  }
};
// get order for user email
const getOrderForUserEmail = async (
  req: Request,
  res: Response,
  email: string,
) => {
  try {
    const result = await OrderServices.getOrdersForUserEmailFromDB(email);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
