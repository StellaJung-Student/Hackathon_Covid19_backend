import mongoose from 'mongoose';

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    description: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const company = mongoose.model('Company', companySchema);
export default company;
