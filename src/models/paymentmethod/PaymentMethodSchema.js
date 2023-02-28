import mongoose from "mongoose";

const paymentmethodSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PaymentMethod", paymentmethodSchema);
