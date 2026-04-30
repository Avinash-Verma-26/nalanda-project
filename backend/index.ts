import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
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
  const searchURL = "https://www.googleapis.com/books/v1/volumes?q=";
  const query = ((req.query.q as string) ?? "").toLowerCase() ?? "";
  const startIndex = (req.query.start as string) ?? "0";
  // console.log(startIndex);
  console.log(query);
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `${searchURL}${encodedQuery}&startIndex=${startIndex}&maxResults=20&orderBy=relevance&printType=books&key=${GOOGLE_BOOKS_API_KEY}`,
    );
    const data = await response.json();
    console.log(data.items[0]);
    res.json(
      data.items.map((book: any) => {
        return {
          id: book.id,
          imageLink: book.volumeInfo.imageLinks.smallThumbnail ?? "",
          isbn: book.volumeInfo.industryIdentifiers[0].identifier,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
        };
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
