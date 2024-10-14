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
      try {
        const bookId = parseInt(id); 
        await deleteBook(bookId); 
        window.location.href = "/";
      } catch (error: any) {
        alert(`Error removing book: ${error.message}`);
      }
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    if (id) {
      try {
        const bookId = parseInt(id);
        await updateBook(bookId, updatedBook);
        setBookData(updatedBook);
        closeModal();
      } catch (error: any) {
        alert("Error updating book");
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
