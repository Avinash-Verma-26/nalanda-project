const searchURL = "https://www.googleapis.com/books/v1/volumes?q=";

export async function fetchBooksByTitle(query: string, startIndex: string) {
  const encoded = encodeURIComponent(query.toLowerCase());
  const response = await fetch(
    `${searchURL}intitle:${encoded}&startIndex=${startIndex}&maxResults=20&orderBy=relevance&printType=books&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
  );
  const data = await response.json();
  return data;
}
export async function fetchBooksByAuthor(query: string, startIndex: string) {
  const encoded = encodeURIComponent(query.toLowerCase());
  const response = await fetch(
    `${searchURL}inauthor:${encoded}&startIndex=${startIndex}&maxResults=20&orderBy=relevance&printType=books&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
  );
  const data = await response.json();
  return data;
}
