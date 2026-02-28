import express from "express";
import cookieParser from "cookie-parser";

// custom routes used as a middleware in the app.js file.
import authRouter from "./routes/auth.route.js";
import accountRouter from "./routes/account.route.js";
import transactionRouter from "./routes/transaction.route.js";

const app = express();

app.use(express.json());
// CookieParse is used for the to configure the server, pass the jwt token in cookie and use as a middleware.
app.use(cookieParser());

// custom route used a middleware
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);

export default app;
