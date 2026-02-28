import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import createTransactionController from "../controller/transaction.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTransactionController);

export default router;
