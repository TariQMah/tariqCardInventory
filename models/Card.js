import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number } = mongoose.Schema.Types;

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    cardCode: {
      type: Number,
      required: true
    },

    qty: {
      type: Number,
      required: true
    },
    sku: {
      type: String,
      unique: true,
      default: shortid.generate()
    },
    bonus: {
      type: String
    },
    mediaUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// prettier-ignore
export default mongoose.models.Card || mongoose.model("Card", CardSchema);
