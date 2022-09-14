import { FunctionComponent, useEffect, useState } from "react";
import { Book } from "../interfaces/Book";
import { getbooks } from "../services/booksService";

interface BooksTableProps {
  changed: boolean;
}

const BooksTable: FunctionComponent<BooksTableProps> = ({ changed }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getbooks()
      .then((result) => setBooks(result.data))
      .catch((err) => console.log(err));
  }, [changed]);

  return (
    <>
      <h4 className="display-5 fs-3 my-5">All Books</h4>
      {books.length ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: Book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books</p>
      )}
    </>
  );
};

export default BooksTable;
