export interface Book {
    id?: number;    // id field is optional even in the backend because EF sets it automatically
    title: string;
    author: string;
    description: string;
}