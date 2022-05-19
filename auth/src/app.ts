import express from "express";
import cookieSession from "cookie-session";
import userRouter from "./routes/userRoute"
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


const app = express();
app.set('trust proxy', true);
app.use(express.json()); // middleware to accept body content and parse json
app.use(cookieSession({
signed : false, //not encrypting sos as to allow different services if built by different languages not to go through the work of decrypting it
secure : process.env.NODE_ENV!=='test' //jest turns this variable to test. Secure =true allow https

}))

app.use('/api/users', userRouter);

app.use(globalErrorHandler);

export default app;