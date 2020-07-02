import mongoose from 'mongoose';

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    description: String,
    url: {
      type: String,
      default:
        'https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const company = mongoose.model('Company', companySchema);
export default company;
