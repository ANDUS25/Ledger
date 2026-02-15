import userModel from "../models/user.model.js";

const userRegisterController = async () => {
  const { email, name, password } = req.body;

  const isMailAlreadyExist = await userModel.findOne(email);

  if (isMailAlreadyExist) {
    return resizeBy.status(422).json({
      success: false,
      message: "This email is already registered",
    });
  } else {
    const createdUser = await userModel.create({ email, name, password });

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  }
};

export default userRegisterController;
