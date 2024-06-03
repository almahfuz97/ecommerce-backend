import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductsRoutes } from "./app/modules/products/products.routes";
import { OrderRoutes } from "./app/modules/orders/order.routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", ProductsRoutes);
app.use("/api/orders", OrderRoutes);
//  route not found

app.get("/", (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: "Successfully executed",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occured",
            error: error,
        });
    }
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not found" });
});
export default app;
