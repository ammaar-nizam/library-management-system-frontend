import { Book } from "../types/Book";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export const createBook = async (book: Omit<Book, "id">): Promise<boolean> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });

        if (response.status === 201) {
            toast.success("Book saved successfully");
            return true; // Return true for successful creation
        } else if (response.status === 409) {
            toast.error("Error: Book with the same title already exists!");
            return false; // Return false for conflict
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Error: Failed to save the book.");
        }
    } catch (error) {
        toast.error((error as Error).message || "Error: Failed to save the book.");
        return false; // Return false for any other errors
    }
};


// Update an existing book
export const updateBook = async (id: number, book: Book): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });

        if (response.status === 204) {
            toast.success("Book updated successfully");
            return true;
        } else if (response.status === 409) {
            toast.error("Error: Book with the same title already exists!");
            return false;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Failed to update the book.");
        }
    } catch (error) {
        toast.error((error as Error).message || "Error: Failed to update the book.");
        return false;
    }
};

// Delete a book by Id
export const deleteBook = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        console.log(response)

        if (response.status === 204) {
            toast.success("Book deleted successfully"); 
            return true; 
        } else {
            throw new Error("Error in deleting the book"); 
        }
    } catch (error) {
        toast.error((error as Error).message || "Error in deleting the book"); 
        return false; 
    }
};
