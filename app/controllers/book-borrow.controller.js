const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const BookBorrowService = require("../services/book-borrow.service");
const ReaderService = require("../services/reader.service");

exports.create = async (req, res, next) => {
  if (!req.body?.MaDocGia || !req.body?.MaSach || !req.body?.NgayMuon) {
    return next(
      new ApiError(400, "MaDocGia, MaSach and NgayMuon can't be empty")
    );
  }
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const document = await bookBorrowService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the book borrow")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    documents = await bookBorrowService.find({});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving book borrow")
    );
  }
  return res.send(documents);
};

exports.findByUser = async (req, res, next) => {
  try {
    // id đọc giả -> Mã đọc giả
    const readerService = new ReaderService(MongoDB.client);
    const { MaDocGia } = await readerService.findById(req.params.id);
    // find book borrow by MaDocGia
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const documents = await bookBorrowService.find({ MaDocGia: MaDocGia });
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving book borrow")
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const _id = req.params.borrowId || req.params.id;
    const document = await bookBorrowService.findById(_id);
    if (!document) {
      return next(new ApiError(404, "Book borrow not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving book borrow with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const document = await bookBorrowService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Book borrow not found"));
    }
    return res.send({ message: "Book borrow was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating book borrow with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const document = await bookBorrowService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Book borrow not found"));
    }
    return res.send({ message: "Book borrow was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete book borrow with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const bookBorrowService = new BookBorrowService(MongoDB.client);
    const document = await bookBorrowService.deleteAll();
    return res.send({
      message: `${document.deletedCount} book borrows were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all book borrows")
    );
  }
};
