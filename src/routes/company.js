import express from 'express';
import Company from '../db/company';
import tryCatch from '../shared/tryCatch';
import AppError from '../shared/appError';

const companyRouter = express.Router();

companyRouter.get(
  '/',
  tryCatch(async (req, res) => {
    const companies = await Company.find();
    res.json({
      status: 'success',
      data: companies,
    });
  })
);

companyRouter.get(
  '/:keyword',
  tryCatch(async (req, res, next) => {
    const { keyword } = req.params;
    const company = await Company.findOne({
      $or: [{ name: keyword }, { address: keyword }],
    });
    if (!company) {
      return next(new AppError('No company is found', 404));
    }
    res.json({
      status: 'success',
      data: company,
    });
  })
);

companyRouter.post(
  '/',
  tryCatch(async (req, res) => {
    const company = new Company(req.body);
    await company.save();
    res.json({
      status: 'success',
      data: company,
    });
  })
);

companyRouter.patch(
  '/:keyword',
  tryCatch(async (req, res, next) => {
    const updatedData = req.body;
    const { keyword } = req.params;
    let company = await Company.findOne({
      $or: [{ name: keyword }, { address: keyword }],
    });
    if (!company) {
      return next(new AppError('No company is found', 404));
    }
    await Company.findByIdAndUpdate(company._id, updatedData, {
      new: true,
      runValidators: true,
    });

    company = await Company.findById(company._id);
    res.json({
      status: 'success',
      data: company,
    });
  })
);

companyRouter.delete(
  '/:keyword',
  tryCatch(async (req, res, next) => {
    const { keyword } = req.params;
    let company = await Company.findOne({
      $or: [{ name: keyword }, { address: keyword }],
    });
    if (!company) {
      return next(new AppError('No company is found', 404));
    }
    await Company.findByIdAndDelete(company._id);
    res.json({
      status: 'success',
      data: company,
    });
  })
);

export default companyRouter;
