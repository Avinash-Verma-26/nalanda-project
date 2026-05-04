import type { Book } from "../types/Book";

type BookCardProps = {
  book: Book;
};
const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bookCard flex flex-col gap-2">
      <img src={book.imageLink} alt="book cover image" />
      <h2>{book.title}</h2>
    </div>
  );
};

export default BookCard;
