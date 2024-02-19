import express, { Request, Response } from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import { connectToDB } from './lib/dbConnect';
import { compileroutes } from './routes/compileroutes';
const app = express();

app.use(express.json());
app.use(cors())
config();

connectToDB();
app.use('/compile', compileroutes)
app.get('/', (req: Request, res: Response) => {
    return res.status(200).send("Api is working fine")
})

app.listen(4000, () => {
    console.log("Server is running on the port 4000");
})