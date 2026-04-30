import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api", (req, res) => {
  console.log("API endpoint accessed", req.method);
  res.json({ message: "Successfully hitting the API endpoint" });
});
app.get("/api/bookSearch", async (req, res) => {
  console.log("Method called");
  const searchURL = "https://openlibrary.org/search.json?q=";
  const query = ((req.query.q as string) ?? "").toLowerCase() ?? "";
  console.log(query);
  try {
    const response = await fetch(`${searchURL}${encodeURIComponent(query)}`);
    const data = await response.json();
    // console.log(data);

    res.json(
      data.docs.map((book: any) => ({
        id: book.key,
        name: book.title,
        author: book.author_name?.[0] ?? "Unknown",
      })),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
