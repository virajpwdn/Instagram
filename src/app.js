import express, { urlencoded } from "express";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import cookieParser from 'cookie-parser'

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/users", userRouter);



export default app;