import mongoose, { Schema } from "mongoose";

const reservationSchema = Schema(
  {
    // typeOfReservation: {
    //   type: String,
    //   enum: ["DINEIN", "TOGO", "DELIVERY"],
    //   default: "DINEIN",
    // },

    dineIn: {
      type: Schema.Types.ObjectId,
      ref: "DineIn",
      required: "table info is required",
    },

    email: {
      type: String,
      ref: "Customer",
      required: "email info is required",
    },

    reserveTime: {
      type: String,
      required: "reservation time is required",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const reservation = mongoose.model("Reservation", reservationSchema);
export default reservation;
