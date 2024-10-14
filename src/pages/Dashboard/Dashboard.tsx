import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Book } from "../../types/Book";
import { getBooks, createBook } from "../../services/bookService";
import BookTable from "../../components/BookTable/BookTable";
import BookFormModal from "../../components/BookFormModal/BookFormModal";
import "./Dashboard.css";
import { CreateButton } from "../../components/Button/Button";

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchQuery, books]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error as Error); // Cast error to `Error` type
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (newBook: Omit<Book, "id">) => {
    try {
      await createBook(newBook);
      fetchBooks(); // Refresh the book list
      closeModal();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <div className="header-container">
        <h2 className="sub-title">Library Dashboard</h2>

        <SearchBar
          placeholder="Search by title, author or description"
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="button-container">
        <CreateButton onClick={openModal} />
      </div>
      <BookTable books={filteredBooks} />
      <BookFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialBook={null}
        onSave={handleCreateBook}
      />
    </>
  );
};

export default Dashboard;
