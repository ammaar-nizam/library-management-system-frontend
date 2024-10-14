import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Book } from "../../types/Book";
import { getBooks, createBook, deleteBook } from "../../services/bookService";
import BookTable from "../../components/BookTable/BookTable";
import BookFormModal from "../../components/BookFormModal/BookFormModal";
import "./Dashboard.css"

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleCreateBook = async (newBook: Book) => {
    try {
      await createBook(newBook);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="header-container">
        <h2 className="sub-title">Library Dashboard</h2>
        <SearchBar
          placeholder="Find a book"
          onSearchChange={handleSearchChange}
        />
      </div>
      <BookTable books={books} />
    </>
  );
};

export default Dashboard;
