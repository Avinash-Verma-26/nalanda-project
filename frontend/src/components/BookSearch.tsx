import { useEffect, useRef, useState } from "react";
import type { Book } from "../types/Book";
import BookCard from "./BookCard";

const BookSearch = () => {
  const baseAPIUrl = import.meta.env.VITE_API_URL;
  const bookListCache = useRef(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const currentCache = bookListCache.current;
    const controller = new AbortController();
    const { signal } = controller;
    const timer = setTimeout(() => {
      if (currentCache.has(searchQuery)) {
        setSearchResult(currentCache.get(searchQuery));
      } else {
        fetch(
          `${baseAPIUrl}/bookSearch/byTitle?q=${encodeURIComponent(searchQuery)}`,
          {
            signal: signal,
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              currentCache.set(searchQuery, data);
              setSearchResult(data);
            } else setSearchResult([]);
          })
          .catch((err) => {
            console.error(err);
            // setIsLoading(false);
          });
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort("Aborting last call");
    };
  }, [searchQuery]);
  return (
    <div id="bookSearch" className="flex flex-col gap-1">
      <label htmlFor="bookSearchBar">Search for Books</label>
      <input
        type="text"
        name="book_search"
        id="bookSearchBar"
        placeholder="Enter book/author name (at least 3 characters)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
      />
      <div id="searchResults" className="grid grid-cols-4 gap-5 w-150">
        {searchResult.map((book) => {
          return <BookCard key={book.id} book={book} />;
        })}
      </div>
    </div>
  );
};

export default BookSearch;
