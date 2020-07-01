import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const handleOpen = () => console.log('✅  Connected to DB');
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

mongoose
  .connect(process.env.MONGO_CONNECTION, mongoOptions)
  .then(() => handleOpen())
  .catch((error) => handleError(error));

// const db = mongoose.connection;

// db.once('open', handleOpen);
// db.on('error', handleError);

// export default db;
