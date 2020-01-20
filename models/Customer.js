import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    customerCode: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

// prettier-ignore
export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
