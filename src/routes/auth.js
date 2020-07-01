import express from 'express';
import User from '../db/user';
import tryCatch from '../shared/tryCatch';
import { generateToken } from '../shared/token';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

authRouter.post(
  '/signup',
  tryCatch(async (req, res) => {
    const user = new User(req.body);
    await user.save();
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
  })
);

export default authRouter;
