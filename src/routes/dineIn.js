import express from "express";
import DineIn from "../db/dineIn";

const dineInRouter = express.Router();

dineInRouter.get("/", async (req, res) => {
  const dineIns = await DineIn.find();
});

dineInRouter.get("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const dineIn = await DineIn.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
});

dineInRouter.post("/", async (req, res) => {
  const dineIn = DineIn.create(req.body);
  res.json(dineIn);
});

dineInRouter.patch("/:keyword", async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let dineIn = await DineIn.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  console.log(dineIn, updatedData);
  if (dineIn) {
    await DineIn.update({ _id: dineIn._id }, updatedData);
  }

  dineIn = await DineIn.findById(dineIn._id);
  res.json(dineIn);
});

dineInRouter.delete("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let dineIn = await DineIn.findOne({
    $or: [
      { numOfPeople: keyword },
      { seatPosition: keyword },
      { tablePicture: keyword },
    ],
  });
  if (dineIn) {
    dineIn = await DineIn.deleteOne({ _id: dineIn._id });
  }
  res.json(dineIn);
});

export default dineInRouter;
