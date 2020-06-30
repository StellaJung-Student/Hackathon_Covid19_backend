import mongoose from "mongoose";

const dineInSchema = mongoose.Schema(
  {
    numberOfPeople: {
      type: Number,
      required: "The Number of people is required",
    },
    seatPosition: {
      type: String,
      required: "seat type is required",
    },
    tablePicture: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const dineIn = mongoose.model("DineIn", dineInSchema);
export default dineIn;
