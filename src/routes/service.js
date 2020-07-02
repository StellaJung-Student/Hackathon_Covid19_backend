import express from 'express';
import Service from '../db/service';

const serviceRouter = express.Router();

serviceRouter.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

serviceRouter.get('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  const Service = await Service.findOne({
    $or: [{ name: keyword }, { company: keyword }],
  });

  res.json(Service);
});

serviceRouter.post('/', async (req, res) => {
  const Service = Service.create(req.body);
  res.json(Service);
});

serviceRouter.patch('/:keyword', async (req, res) => {
  const updatedData = req.body;
  const { keyword } = req.params;
  let Service = await Service.findOne({
    $or: [{ name: keyword }, { company: keyword }],
  });
  console.log(Service, updatedData);
  if (Service) {
    await Service.update({ _id: Service._id }, updatedData);
  }

  Service = await Service.findById(Service._id);
  res.json(Service);
});

serviceRouter.delete('/:keyword', async (req, res) => {
  const { keyword } = req.params;
  let Service = await Service.findOne({
    $or: [{ name: keyword }, { company: keyword }],
  });
  if (Service) {
    Service = await Service.deleteOne({ _id: Service._id });
  }
  res.json(Service);
});

export default serviceRouter;
