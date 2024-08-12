import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ticket from "./routes/tickets";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6969;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`listening on ${port}`));

const mongoURI: string = process.env.MONGO_URI!;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("CONNECTED!");
  } catch (error) {
    console.log("ERROR!", error);
  }
};

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("YOOOO!");
});

app.use("/api/tickets", ticket);
