import express from 'express';
import item from '../db/service';

const itemRouter = express.Router();

itemRouter.get('/', async (req, res) => {
  const items = await item.find();
  res.json(items);
});

itemRouter.get('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const item = await item.findOne({
    $or: [{ name: keyword }, { desc: keyword }, { price: keyword }],
  });

  res.json(item);
});

itemRouter.post('/', async (req, res) => {
  const item = item.create(req.body);
  res.json(item);
});

itemRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let item = await item.findOne({
    $or: [{ name: keyword }, { desc: keyword }, { price: keyword }],
  });
  console.log(item, updatedData);
  if (item) {
    await item.update({ _id: item._id }, updatedData);
  }

  item = await item.findById(item._id);
  res.json(item);
});

itemRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let item = await item.findOne({
    $or: [{ name: keyword }, { desc: keyword }, { price: keyword }],
  });
  if (item) {
    item = await item.deleteOne({ _id: item._id });
  }
  res.json(item);
});

export default itemRouter;
