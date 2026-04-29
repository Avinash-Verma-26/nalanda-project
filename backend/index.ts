import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  console.log("API endpoint accessed", req.method);
  res.json({ message: "Successfully hitting the API endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
