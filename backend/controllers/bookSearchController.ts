import { Request, Response } from "express";
import {
  fetchBooksByAuthor,
  fetchBooksByTitle,
} from "../services/googleBooksService";

export async function searchByTitle(req: Request, res: Response) {
  const query = (req.query.q as string) ?? "";
  const startIndex = (req.query.start as string) ?? "0";
  try {
    const books = await fetchBooksByTitle(query, startIndex);
    res.json(
      (books.items ?? []).map((book: any) => {
        return {
          id: book.id,
          imageLink: book.volumeInfo.imageLinks?.smallThumbnail ?? "",
          isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
        };
      }),
    );
  } catch {
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
export async function searchByAuthor(req: Request, res: Response) {
  const query = (req.query.q as string) ?? "";
  const startIndex = (req.query.start as string) ?? "0";
  try {
    const books = await fetchBooksByAuthor(query, startIndex);
    res.json(
      (books.items ?? []).map((book: any) => {
        return {
          id: book.id,
          imageLink: book.volumeInfo.imageLinks?.smallThumbnail ?? "",
          isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
        };
      }),
    );
  } catch {
    res.status(500).json({ error: "Failed to fetch books" });
  }
}
