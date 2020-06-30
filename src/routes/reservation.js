import express from "express";
import Reservation from "../db/reservation";

const reservationRouter = express.Router();

reservationRouter.get("/", async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

reservationRouter.get("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const reservation = await Reservation.findOne({
    $or: [{ DineIn: keyword }, { customer: keyword }, { reserveTime: keyword }],
  });

  res.json(reservation);
});

reservationRouter.post("/", async (req, res) => {
  const reservation = await Reservation.create(req.body);
  res.json(reservation);
});

reservationRouter.patch("/:keyword", async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let reservation = await Reservation.findOne({
    $or: [{ DineIn: keyword }, { customer: keyword }, { reserveTime: keyword }],
  });
  console.log(reservation, updatedData);
  if (reservation) {
    await Reservation.update({ _id: reservation._id }, updatedData);
  }

  reservation = await Reservation.findById(reservation._id);
  res.json(reservation);
});

reservationRouter.delete("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let reservation = await Reservation.findOne({
    $or: [{ DineIn: keyword }, { customer: keyword }, { reserveTime: keyword }],
  });
  if (reservation) {
    reservation = await Reservation.deleteOne({ _id: reservation._id });
  }
  res.json(reservation);
});

export default reservationRouter;
