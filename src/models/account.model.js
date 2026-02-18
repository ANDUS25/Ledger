import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // here User is the reference of the user model, which we use for registration and login purpose.
      ref: "User",
      required: [true, "Account must be associated with a user"],
      // In mongoDB index is used for the fast searching of the data.
      index: true,
    },
    status: {
      enum: {
        values: ["ACTIVE", "FROZEN", "CLOSED"],
        message: ["Status must be either ACTIVE, FROZEN, or CLOSED"],
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required for the account"],
      default: "INR",
    },
  },
  { timestamps: true },
);

// using this we can find the user using either user id or the status (check in accountSchema for user and status field)
// This know as a compound index.
accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model("Account", accountSchema);

export default accountModel;
