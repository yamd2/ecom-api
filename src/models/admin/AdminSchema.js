import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive ",
    },
    address: {
      type: String,
      default: "",
    },
    confirmPassword: {
      type: String,
      default: "",
    },
    emailVerificationCode: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", adminSchema);
