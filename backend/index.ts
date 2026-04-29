import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();
const books = [
  {
    isbn: "123224321424",
    name: "Test Book 1",
    author: "Author 1",
  },
  {
    isbn: "3254325432324",
    name: "Test Book 2",
    author: "Author 2",
  },
];

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
  const searchURL = "https://openlibrary.org/search.json?q=";
  const query = ((req.query.q as string) ?? "").toLowerCase() ?? "";
  try {
    const response = await fetch(`${searchURL}${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);

    res.json(
      data.docs.map((book: any) => ({
        id: book.key,
        name: book.title,
        author: book.author_name?.[0] ?? "Unknown",
      })),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed ot fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
