import express, {Response} from 'express';
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/', (_, res:Response) => {
  res.json({message: 'Hello there!'})
})

app.listen(PORT, () => {
  console.log('Server is listening');
})