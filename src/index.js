import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import customerRouter from './routes/customer.js';



const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/customers", customerRouter);

app.get('/', (req, res) => {
    res.send('Hello node')
});



app.listen(PORT, console.log(`Server is started on ${PORT}`));