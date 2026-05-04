import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookSearchRouter from "./routes/bookSearch";
dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Successfully hitting the API endpoint" });
});
app.use("/api/bookSearch", bookSearchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
