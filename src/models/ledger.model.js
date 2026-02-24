import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    require: [true, "Ledger must be associated with an account"],
    index: true,
    // immutable is for that this data is not editable once it get filled.
    immutable: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required for the ledger entry"],
    immutable: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: [true, "Ledger entry must be associated with a transaction"],
    index: true,
    immutable: true,
  },
  type: {
    type: String,
    enum: ["DEBIT", "CREDIT"],
    required: [true, "Type is required for the ledger entry"],
    immutable: true,
  },
});


// This is the common function which will show/throw the error when we try to update or delete the ledger entry because the ledger entry is immutable and it can not be modified or deleted once it get created.
const preventLedgerModification = () => {
  throw new Error("Ledger entries can not be modified or delete.");
};

// This is the pre middleware which will be executed before the delete or update operation on the ledger entry and it will call the preventLedgerModification function to throw the error.
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("replaceOne", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);

const ledgerModel = mongoose.model("Ledger", ledgerSchema);

export default ledgerModel;
