import express from 'express';
import Placement from '../db/placement';
import Company from '../db/company';
import AppError from '../shared/appError';

const placementRouter = express.Router();

placementRouter.get('/', async (req, res) => {
  const placements = await Placement.find();
  res.json({
    status: 'success',
    data: placements,
  });
});

placementRouter.get('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  const placement = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  res.json({
    status: 'success',
    data: placement,
  });
});

placementRouter.post('/', async (req, res, next) => {
  const companyName = req.body.company;
  const company = await Company.findOne({
    name: companyName,
  });
  if (!company) {
    return next(new AppError('No company is found', 404));
  }
  req.body.company = company._id;
  const placement = new Placement(req.body);
  await placement.save();
  res.json({
    status: 'success',
    data: placement,
  });
});

placementRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let placement = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  console.log(placement, updatedData);
  if (placement) {
    await Placement.update({ _id: placement._id }, updatedData);
  }

  placement = await Placement.findById(placement._id);
  res.json(placement);
});

placementRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let placement = await Placement.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  if (placement) {
    placement = await Placement.deleteOne({ _id: placement._id });
  }
  res.json(placement);
});

export default placementRouter;
