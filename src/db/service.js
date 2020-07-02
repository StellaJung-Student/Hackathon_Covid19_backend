import mongoose, { Schema } from 'mongoose';

const serviceSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company is required'],
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Category',
    //   required: [true, 'Category is required'],
    // },
    rating: {
      type: Number,
      default: 3,
    },
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

const service = mongoose.model('Service', serviceSchema);

export default service;
