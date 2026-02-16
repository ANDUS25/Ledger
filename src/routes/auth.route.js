import express from "express";
import userRegisterController from "../controller/auth.controller.js";

const router = express.Router();

// This route is for user registration
router.post("/register", userRegisterController);

// This route is for user login
router.post("/login", userRegisterController);

export default router;
