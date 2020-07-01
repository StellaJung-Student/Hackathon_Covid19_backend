import mongoose, { Schema } from 'mongoose';

const reservationSchema = Schema(
  {
    placement: {
      type: Schema.Types.ObjectId,
      ref: 'Placement',
      required: [true, 'Placement is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User info is required'],
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Company info is required'],
    },
    reserveTime: {
      type: Date,
      required: [true, 'reservation time is required'],
      default: new Date(),
    },
    status: {
      type: String,
      enum: ['cancel', 'ok', 'check'],
      default: 'ok',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const reservation = mongoose.model('Reservation', reservationSchema);
export default reservation;
