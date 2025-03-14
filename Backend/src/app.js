import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import aiRouter from "./routes/ai.routes.js";
import postRouter from "./routes/post.routes.js";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/ai", aiRouter);
app.use("/posts", postRouter);

export default app;
