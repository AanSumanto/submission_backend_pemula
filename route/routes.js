import {
  addBook,
  deleteBookById,
  editBookById,
  getAllBooks,
  getBookById,
} from "../controller/controller.js";

export const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookById,
  },
  // {
  //   method: "GET",
  //   path: "/books/reading={reading?}",
  // },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookById,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookById,
  },
];
