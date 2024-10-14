import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetail.css";
import { EditButton, DeleteButton } from "../Button/Button";
import BookFormModal from "../BookFormModal/BookFormModal";
import { Book } from "../../types/Book";
import {
  getBookById,
  updateBook,
  deleteBook,
} from "../../services/bookService";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bookData, setBookData] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const bookId = parseInt(id);
          const data = await getBookById(bookId);
          setBookData(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid book ID");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleEdit = () => {
    openModal();
  };

  const handleDelete = async () => {
    if (id) {
      const bookId = parseInt(id);
      const isSuccess = await deleteBook(bookId); // Attempt to delete the book

      if (isSuccess) {
        window.location.href = "/"; // Redirect only if deletion is successful
      } else {
        console.error("Error removing book: Deletion failed.");
      }
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    if (id) {
      const bookId = parseInt(id);
      const { id: _, ...oldBookData } = bookData as Book; // Store the old book data without the id

      const isSuccess = await updateBook(bookId, updatedBook); // Attempt to update the book

      if (isSuccess) {
        setBookData(updatedBook); // Update state with the new data only if successful
        closeModal(); // Close the modal only if successful
      } else {
        // If the update fails, revert to the original book data
        setBookData(oldBookData);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookData) {
    return <div>No book found</div>;
  }

  return (
    <div className="wrapper">
      <div className="book-detail">
        <h1>{bookData.title}</h1>
        <p>
          <b>Author:</b> {bookData.author}
        </p>
        <p>
          <b>Description:</b> {bookData.description}
        </p>

        <div className="button-container">
          <EditButton onClick={handleEdit} />
          <BookFormModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialBook={bookData}
            onSave={handleUpdateBook}
          />
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
