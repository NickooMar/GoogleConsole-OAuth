import express from "express";
import authRoutes from "./routes/auth.route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);

mongoose.connect(`${process.env.MONGO_URI}`);

const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));
db.on("error", (error) => console.error(error));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT} 🚀`));
