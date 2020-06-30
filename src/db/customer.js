import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First Name is required",
    },
    lastName: {
      type: String,
      required: "Last Name is required",
    },
    phone: {
      type: String,
      required: "Phone Number is required",
    },
    email: {
      type: String,
      unique: true,
      required: "email is required",
    },
    password: {
      type: String,
      required: "password is required",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const customer = mongoose.model("Customer", customerSchema);
export default customer;
