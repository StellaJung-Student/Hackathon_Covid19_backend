import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import './db';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import placementRouter from './routes/placement';
import reservationRouter from './routes/reservation';
import serviceRouter from './routes/service';
import companyRouter from './routes/company';

const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/placements', placementRouter);
app.use('/reservations', reservationRouter);
app.use('/services', serviceRouter);
app.use('/companies', companyRouter);

app.listen(PORT, console.log(`Server is started on ${PORT}`));
