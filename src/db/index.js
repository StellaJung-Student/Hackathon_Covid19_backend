import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGO_CONNECTION, mongoOptions);

const db = mongoose.connection;

const handleOpen = () => console.log('✅  Connected to DB');
const handleError = (error) =>
  console.log(`❌ Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

export default db;
