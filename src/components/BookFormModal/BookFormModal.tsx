import React, { useState, useEffect, FormEvent } from "react";
import Modal from "react-modal";
import "./BookFormModal.css";
import { Book } from "../../types/Book";

// Define props for the BookFormModal component
interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBook?: Book | null;
  onSave: (book: Omit<Book, "id">) => void; // Omit id since it's not needed in form submission
}

const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  initialBook,
  onSave,
}) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || "");
      setAuthor(initialBook.author || "");
      setDescription(initialBook.description || "");
    } else {
      setTitle("");
      setAuthor("");
      setDescription("");
    }
  }, [initialBook]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const bookData = {
        title: title,
        author,
        description,
      };
      onSave(bookData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={initialBook ? "Edit Book" : "Create Book"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{initialBook ? "Edit Book" : "Create a New Book"}</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <label>
          Book Name:
          <input
            type="text"
            name="bookName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </label>

        <div className="book-modal-button-container">
          <button type="submit" className="create-btn">
            {initialBook ? "Save Changes" : "Create Book"}
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

Modal.setAppElement("#root"); // Add this to avoid accessibility warning

export default BookFormModal;
