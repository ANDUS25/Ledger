import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
// CookieParse is used for the to configure the server, pass the jwt token in cookie and use as a middleware.
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
