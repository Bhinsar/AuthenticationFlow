import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/api/auth", authRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Not Found" });
});



const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection could not be established immediately.");
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

export default app;
