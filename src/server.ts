import express, {Response} from 'express';
import cors from "cors";
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/', (_, res:Response) => {
  res.json({message: 'Hello there!'});
})

async function connectDatabase() {
  const mongoURI = "mongodb://127.0.0.1:27017/leaverTracker";
  await mongoose.connect(mongoURI);
  console.log("database connected");
}

function listen() {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}

async function startServer() {
  await connectDatabase();
  listen();
}

startServer();