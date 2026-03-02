import mongoose from "mongoose";
import accountModel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";
import userModel from "../models/user.model.js";

const createTransactionController = async (req, res) => {
  const { fromAccount, toAccount, amount, idempotencyKey } = req?.body;
  console.log("req.body", req.body);

  // 1. Check all those field are available
  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 2. Check receiver and sender id's are present in DB
  const fromUserAccount = await accountModel.findOne({
    user: fromAccount,
  });

  const toUserAccount = await accountModel.findOne({
    user: toAccount,
  });

  if (!fromUserAccount || !toUserAccount) {
    return res.status(404).json({ message: "User account not found" });
  }

  // 3. Check the idempotency key are not repeating again

  const isIdempotencyKeyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isIdempotencyKeyExist) {
    return res.status(409).json({ message: "Idempotency key already exists" });
  }

  const account = await transactionModel.create({
    fromAccount: fromAccount,
    toAccount: toAccount,
    amount: amount,
    idempotencyKey: idempotencyKey,
  });

  return res.status(200).json({ message: "Transaction created successfully" });
};

export default createTransactionController;
