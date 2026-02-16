import Title from "../../utils/string.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: Title.INTERNAL_SERVER_ERROR });
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });

  const findUserPassword = await userModel.matchPassword(password)

  try {
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: Title.USER_NOT_FOUND,
      });
    }else if(!findUserPassword){
      return res.status(401).json({success:false,message:Title.INVALID_PASSWORD})
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: Title.INTERNAL_SERVER_ERROR });
  }
};

export default userRegisterController;
