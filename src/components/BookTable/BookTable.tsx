import { useNavigate } from "react-router-dom";
import { Book } from "../../types/Book";
import "./BookTable.css";
import { ViewButton } from "../Button/Button";

interface BookTableProps {
  books: Book[];
}

const BookTable: React.FC<BookTableProps> = ({ books }) => {
  const navigate = useNavigate();

  const handleViewBook = (id: number) => {
    try {
      navigate(`/book/${id}`); // Navigate to the book detail page
    } catch (error) {
      console.error("Error viewing book:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
            <td>
              <ViewButton onClick={() => book.id && handleViewBook(book.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
