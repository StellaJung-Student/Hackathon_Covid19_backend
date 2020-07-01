import express from 'express';
import Restaurant from '../db/company';

const restaurantRouter = express.Router();

restaurantRouter.get('/', async (req, res) => {
  const users = await Restaurant.find();
  res.json(users);
});

restaurantRouter.get('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const restaurant = await Restaurant.findOne({
    $or: [{ name: keyword }, { address: keyword }],
  });

  res.json(restaurant);
});

restaurantRouter.post('/', async (req, res) => {
  const restaurant = Restaurant.create(req.body);
  res.json(restaurant);
});

restaurantRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let restaurant = await Restaurant.findOne({
    $or: [{ name: keyword }, { address: keyword }],
  });
  console.log(restaurant, updatedData);
  if (restaurant) {
    await Restaurant.update({ _id: restaurant._id }, updatedData);
  }

  restaurant = await Restaurant.findById(restaurant._id);
  res.json(restaurant);
});

restaurantRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let restaurant = await Restaurant.findOne({
    $or: [{ name: keyword }, { address: keyword }],
  });
  if (restaurant) {
    restaurant = await Restaurant.deleteOne({ _id: restaurant._id });
  }
  res.json(restaurant);
});

export default restaurantRouter;
