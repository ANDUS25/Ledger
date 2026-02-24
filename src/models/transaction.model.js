import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Transaction must be associated with a from account"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Transaction must be associated with a to account"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
        message:
          "Status must be either PENDING, COMPLETED, FAILED, or REVERSED",
      },
      default: "PENDING",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required for the transaction"],
      min: [0, "Amount must be a positive number"],
    },
    idempotencyKey: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Idempotency key is required for the transaction"],
    },
  },
  { timestamps: true },
);

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;
