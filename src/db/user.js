import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Phone Number is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Password confirmation is required'],
      minlength: 6,
      validate: {
        validator: function (password) {
          return password === this.password;
        },
        message: 'Passwords are not matched.',
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const user = mongoose.model('User', userSchema);
export default user;
