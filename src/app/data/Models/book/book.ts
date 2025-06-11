export interface IBook {
    bookId?: string;
    title: string;
    author: string;
    genre: string;
    imageUrl?: string;
    totalCopies: number;
    availableCopies: number;
    publishedYear?: Date;
    publisher?: string;
    description?: string;
    isbn?: string;
}