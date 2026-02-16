import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userRegisterController = async (req, res) => {
  const { email, name, password } = req.body;

  const isMailAlreadyExist = await userModel.findOne({ email });

  if (isMailAlreadyExist) {
    return resizeBy.status(422).json({
      success: false,
      message: "This email is already registered",
    });
  } else {
    console.log("user appear here");

    const createdUser = await userModel.create({ email, name, password });

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "User created successfully",
      token,
      data: {
        _id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
      },
    });
  }
};

export default userRegisterController;
