import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes/routes';
import globalErrorHandler from './middlewares/global.error.handler';
import customCors from './middlewares/customCors';
const cookieParser = require("cookie-parser");

const app: Application = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Custom CORS middleware (must be before all routes)
app.use(customCors);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Welcome to Prisma Practice server.."
    })
});

app.use('/api/v1', router);

// Then, your error handler MUST come after routes
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;