import { nanoid } from "nanoid";
import { books } from "../data/data.js";

export const addBook = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (name === undefined) {
    const res = h.response({
      status: "Fail",
      message: "Gagal menambahkan buku. Nama buku tidak boleh kosong",
    });
    res.code(400);

    return res;
  }

  if (pageCount < readPage) {
    const res = h.response({
      status: "Fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);

    return res;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    });
    res.code(201);

    return res;
  }

  const res = h.response({
    status: "Fail",
    message: "Buku gagal ditambahkan",
  });
  res.code(500);

  return res;
};

export const getAllBooks = (req, h) => {
  const { name, reading, finished } = req.query;

  var filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLoweCase().includes(name.toLoweCase())
    );
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === !!Number(reading)
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === !!Number(finished)
    );
  }

  const res = h.response({
    status: "success",
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  res.code(200);

  return res;
};

export const getBookById = (req, h) => {
  const { id } = req.params;
  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: "Berhasil",
      data: {
        book,
      },
    };
  }

  const res = h.response({
    status: "Fail",
    message: "Buku tidak ditemukan",
  });

  res.code(401);

  return res;
};

export const editBookById = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (index !== -1) {
    if (bookName === undefined) {
      const res = h.response({
        status: "Fail",
        message: "Gagal memperbaharui buku. Mohon nama buku diisi",
      });
      res.code(400);

      return res;
    }

    if (pageCount < readPage) {
      const res = h.response({
        status:
          "Gagal memperbaharui buku. halaman baca tidak boleh lebih dari total halaman",
      });
      res.code(400);

      return res;
    }

    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const res = h.response({
      status: "success",
      message: "Buku berhasil diperbaharui",
    });
    response.code(200);

    return res;
  }

  const response = h.response({
    status: "Fail",
    message: "Gagal memperbaharui buku. Id tidak ditemukan",
  });
  res.code(404);

  return res;
};

export const deleteBookById = (req, h) => {
  const { id } = req.params;

  const index = books.findIndex((note) => note.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const res = h.response({
      status: "success",
      message: "Buku berhasil di hapus",
    });
    res.code(200);

    return res;
  }

  const res = h.response({
    status: "Fail",
    message: "Buku gagal dihapus, Id tidak ditemukan",
  });
  res.code(404);

  return response;
};
