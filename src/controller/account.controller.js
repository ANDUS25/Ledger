import accountModel from "../models/account.model.js";

const createAccountController = async (req, res) => {
  const user = res.user;
  const account = await accountModel.crate({
    user: user._id,
  });

  res.status(201).json({
    account,
  });
};

export { createAccountController };
