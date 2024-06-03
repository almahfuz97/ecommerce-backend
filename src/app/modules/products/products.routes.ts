import express from "express";
import { ProductsController } from "./products.controller";

const router = express.Router();
// get all products
router.get("/", ProductsController.getAllProducts);
router.get("/:productId", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.put("/:productId", ProductsController.updateProductByID);
router.delete("/:productId", ProductsController.deleteProductByID);

export const ProductsRoutes = router;
