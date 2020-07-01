import express from 'express';
import User from '../db/user';
import tryCatch from '../shared/tryCatch';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

userRouter.get('/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  res.json(user);
});

userRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let user = await User.findOne({
    $or: [{ firstName: keyword }, { lastName: keyword }, { phone: keyword }],
  });
  console.log(user, updatedData);
  if (user) {
    await User.update({ _id: user._id }, updatedData);
  }

  user = await User.findById(user._id);
  res.json(user);
});

userRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let user = await User.findOne({
    $or: [{ firstName: keyword }, { lastName: keyword }, { phone: keyword }],
  });
  if (user) {
    user = await User.deleteOne({ _id: user._id });
  }
  res.json(user);
});

export default userRouter;
