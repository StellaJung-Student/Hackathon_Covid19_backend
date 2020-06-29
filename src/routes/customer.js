import express from 'express';
import customers from '../db/customer.json';

const customerRouter = express.Router();

customerRouter.get('/', (req, res) => {
    res.json(customers);
})

customerRouter.post('/', (req, res) => {
    customers.push(req.body);
    res.json(req.body);
})

export default customerRouter;