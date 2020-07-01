import mongoose, { Schema } from 'mongoose';

const placementSchema = mongoose.Schema(
  {
    seatCount: {
      type: Number,
      required: [true, 'Number of seats is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    picture: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company is required'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const placement = mongoose.model('Placement', placementSchema);
export default placement;
