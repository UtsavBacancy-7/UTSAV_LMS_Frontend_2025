export interface IBook {
    id: number;
    title: string;
    author: string;
    genre: string;
    genreId: number;
    coverImageUrl?: string;
    totalCopies: number;
    availableCopies: number;
    publicationYear?: Date;
    publisher?: string;
    description?: string;
    isbn?: string;
}