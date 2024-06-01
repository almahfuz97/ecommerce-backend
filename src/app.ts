import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use()

app.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: "Successfully executed",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occured",
            error: error
        })
    }
})

export default app;

