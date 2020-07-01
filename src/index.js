import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import './db';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import placementRouter from './routes/placement';
import reservationRouter from './routes/reservation';
import serviceRouter from './routes/service';
import companyRouter from './routes/company';
import AppError from './shared/appError';
import errorHandler from './shared/errorHandler';

const app = express();

const PORT = process.env.PORT;
app.use(logger('dev'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/placements', placementRouter);
app.use('/reservations', reservationRouter);
app.use('/services', serviceRouter);
app.use('/companies', companyRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`No URL,${req.originalUrl} on this server!`, 404));
});

// error handling
app.use(errorHandler);
app.listen(PORT, console.log(`Server is started on ${PORT}`));
