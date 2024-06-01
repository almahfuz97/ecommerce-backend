import express from 'express'
import { ProductsController } from './products.controller';

const router = express.Router();

router.get('/', ProductsController.getAllProducts)

export const ProductsRoutes = router;
