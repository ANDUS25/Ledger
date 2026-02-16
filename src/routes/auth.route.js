import express from "express";
import userController from "../controller/auth.controller.js";

const router = express.Router();

// This route is for user registration
router.post("/register", userController.userRegisterController);

// This route is for user login
router.post("/login", userController.userLoginController);

export default router;
