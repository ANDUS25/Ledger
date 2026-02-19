import Title from "../../utils/string.ts";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendRegistrationEmail from "../service/email.service.js";

const userRegisterController = async (req, res) => {
  const { email, name, password } = req.body;

  const isMailAlreadyExist = await userModel.findOne({ email });

  try {
    if (isMailAlreadyExist) {
      return res.status(422).json({
        success: false,
        message: Title.EMAIL_IS_ALREADY_REGISTERED,
      });
    } else {
      const createdUser = await userModel.create({ email, name, password });

      const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      res.cookie("token", token);

      res.status(201).json({
        message: Title.USER_CREATED_SUCCESSFULLY,
        token,
        data: {
          _id: createdUser._id,
          email: createdUser.email,
          name: createdUser.name,
        },
      });

      await sendRegistrationEmail(createdUser.name, createdUser.email);
    }
  } catch (error) {
    console.log("Error in userRegisterController:", error);
    return res.status(500).json({
      status: false,
      message: error?.message || Title.INTERNAL_SERVER_ERROR,
    });
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email }).select("+password");

  const findUserPassword = await findUser.matchPassword(password);

  try {
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: Title.USER_NOT_FOUND,
      });
    } else if (!findUserPassword) {
      return res
        .status(401)
        .json({ success: false, message: Title.INVALID_PASSWORD });
    } else {
      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      res.cookie("token", token);

      return res.status(200).json({
        message: Title.USER_LOGIN_SUCCESSFULLY,
        token,
        data: {
          _id: findUser._id,
          email: findUser.email,
          name: findUser.name,
        },
      });
    }
  } catch (error) {
    console.log("Error in userLoginController:", error);
    return res
      .status(500)
      .json({ status: false, message: Title.INTERNAL_SERVER_ERROR });
  }
};

export default { userRegisterController, userLoginController };
