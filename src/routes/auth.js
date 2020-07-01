import express from 'express';
import User from '../db/user';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

authRouter.post('/signup', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  res.json(user);
});

export default authRouter;
