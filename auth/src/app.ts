import express from "express";
import userRouter from "./routes/userRoute"
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


const app = express();

app.use(express.json()); // middleware to accept body content and parse json


app.use('/api/users', userRouter);

app.use(globalErrorHandler);

export default app;