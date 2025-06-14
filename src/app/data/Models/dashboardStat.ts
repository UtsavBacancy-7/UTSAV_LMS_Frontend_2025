export interface IDashboardStat {
    books: number,
    borrowedBooks: number,
    returnedBook: number,
    students: number,
    librarians: number,
    genres: number,
    reviews: number,
    recentIssuedBooks: recentIssuedBook[]
}

export interface recentIssuedBook {
    id: string,
    title: string,
    studentName: string,
    issueDate: string,
    dueDate: string
}