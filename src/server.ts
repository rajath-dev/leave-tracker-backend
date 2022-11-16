import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import authRouter from './routers/auth.route';
import inviteRouter from './routers/invite.route';
import dotnev from 'dotenv';

dotnev.config();

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use(process.env.BASE_API ?? '/', authRouter);
app.use(process.env.BASE_API ?? '/', inviteRouter);

async function connectDatabase() {
  const mongoURI = process.env.MONGO_URI ?? '';
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