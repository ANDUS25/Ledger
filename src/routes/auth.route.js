import express from "express";
import userRegisterController from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", userRegisterController);

export default router;
