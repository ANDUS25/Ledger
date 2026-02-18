import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || res.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    res.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, invalid token",
    });
  }
};

export default authMiddleware;
