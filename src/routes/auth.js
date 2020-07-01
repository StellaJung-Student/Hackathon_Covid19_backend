import express from 'express';
import User from '../db/user';
import tryCatch from '../shared/tryCatch';
import { generateToken } from '../shared/token';
import AppError from '../shared/appError';

const authRouter = express.Router();

const responseWithToken = (user, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

authRouter.post(
  '/login',
  tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError('Please provide user email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user || !(await user.checkPassword(password, user.password))) {
      next(new AppError('Incorrect email or password', 401));
    }
    responseWithToken(user, res);
  })
);

authRouter.post(
  '/signup',
  tryCatch(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    responseWithToken(user, res);
  })
);

export default authRouter;
