import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import customerRouter from "./routes/customer.js";
import "./db";
import dineInRouter from "./routes/dineIn.js";
import itemRouter from "./routes/item.js";
import togoRouter from "./routes/togo.js";
import reservationRouter from "./routes/reservation.js";

const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());

app.use("/customers", customerRouter);
app.use("/dineIn", dineInRouter);
app.use("/item", itemRouter);
app.use("/togo", togoRouter);
app.use("/reservation", reservationRouter);

app.get("/", (req, res) => {
  res.send("Hello node");
});

app.listen(PORT, console.log(`Server is started on ${PORT}`));
