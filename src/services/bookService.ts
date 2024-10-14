import { Book } from "../types/Book";

const API_URL = "https://localhost:7080/api/books";

// Get all books
export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error in retrieving the list of books");
    return await response.json();
};

// Get a book by Id
export const getBookById = async (id: number): Promise<Book> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error in retrieving the book");
    return await response.json();
};

// Create a new book
export const createBook = async (book: Book): Promise<Book> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Error in creating the book");
    return await response.json();
};

// Update an existing book
export const updateBook = async (id: number, book: Book): Promise<Book> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Error in updating the book");
    return await response.json();
};

// Delete a book by Id
export const deleteBook = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error in deleting the book");
};
