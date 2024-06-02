import express from "express";
import { ProductsController } from "./products.controller";

const router = express.Router();
// get all products
router.get("/", ProductsController.getAllProducts);
router.post("/", ProductsController.createProduct);

export const ProductsRoutes = router;
