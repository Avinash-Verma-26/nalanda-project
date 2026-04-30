import { useEffect, useRef, useState } from "react";
import type { Book } from "../types/Book";

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
        fetch(`${baseAPIUrl}/bookSearch?q=${encodeURIComponent(searchQuery)}`, {
          signal: signal,
        })
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
      <div id="searchResults" className="flex flex-col gap-0.5">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          searchResult.map((book) => {
            return (
              <div
                key={book.id}
                className="bookCard flex flex-col gap-0.5 border-2"
              >
                <div className="bookName font-bold">{book.name}</div>
                <div className="authorName">{book.author}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookSearch;
