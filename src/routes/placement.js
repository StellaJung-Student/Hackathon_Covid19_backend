import express from 'express';
import Placement from '../db/placement';

const placementRouter = express.Router();

placementRouter.get('/', async (req, res) => {
  const dineIns = await Placement.find();
  res.json(dineIns);
});

placementRouter.get('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const dineIn = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
});

placementRouter.post('/', async (req, res) => {
  const dineIn = Placement.create(req.body);
  res.json(dineIn);
});

placementRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let dineIn = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  console.log(dineIn, updatedData);
  if (dineIn) {
    await Placement.update({ _id: dineIn._id }, updatedData);
  }

  dineIn = await Placement.findById(dineIn._id);
  res.json(dineIn);
});

placementRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let dineIn = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  if (dineIn) {
    dineIn = await Placement.deleteOne({ _id: dineIn._id });
  }
  res.json(dineIn);
});

export default placementRouter;
