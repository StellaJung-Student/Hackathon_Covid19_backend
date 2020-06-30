import express from "express";
import Customer from "../db/customer";

const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

customerRouter.get("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const customer = await Customer.findOne({
    $or: [{ firstName: keyword }, { lastName: keyword }, { phone: keyword }],
  });

  res.json(customer);
});

customerRouter.post("/", async (req, res) => {
  const customer = Customer.create(req.body);
  res.json(customer);
});

customerRouter.patch("/:keyword", async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let customer = await Customer.findOne({
    $or: [{ firstName: keyword }, { lastName: keyword }, { phone: keyword }],
  });
  console.log(customer, updatedData);
  if (customer) {
    await Customer.update({ _id: customer._id }, updatedData);
  }

  customer = await Customer.findById(customer._id);
  res.json(customer);
});

customerRouter.delete("/:keyword", async (req, res) => {
  const { keyword } = req.params;
  let customer = await Customer.findOne({
    $or: [{ firstName: keyword }, { lastName: keyword }, { phone: keyword }],
  });
  if (customer) {
    customer = await Customer.deleteOne({ _id: customer._id });
  }
  res.json(customer);
});

export default customerRouter;
