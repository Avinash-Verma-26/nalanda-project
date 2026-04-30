import { useEffect, useState } from "react";
import type { Book } from "../types/Book";

const BookSearch = () => {
  const baseAPIUrl = import.meta.env.VITE_API_URL;
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResult([]);
      return;
    }
    console.log(searchQuery);
    const controller = new AbortController();
    fetch(`${baseAPIUrl}/bookSearch?q=${encodeURIComponent(searchQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSearchResult(data);
        else setSearchResult([]);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => controller.abort();
  }, [searchQuery]);
  return (
    <div id="bookSearch" className="flex flex-col gap-1">
      <label htmlFor="">Search for Books</label>
      <input
        type="text"
        name="book_search"
        id="bookSearchBar"
        placeholder="Enter book/author name (at least 3 characters)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
      />
      <div id="searchResults" className="flex flex-col gap-0.5">
        {searchResult.map((book) => {
          return <div key={book.id}>{book.name}</div>;
        })}
      </div>
    </div>
  );
};

export default BookSearch;
