import axios from "axios";
import { Book } from "../interfaces/Book";

const api: string = process.env.REACT_APP_API || "";

// add new book
export const addBook = (newBook: Book): Promise<Book> => {
  return axios.post(`${api}books`, newBook);
};

// get books
export const getbooks = (): Promise<any> => {
  return axios.get(`${api}books`);
};
