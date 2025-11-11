const express = require("express");
const router = express.Router();
const bookBorrowController = require("../../controllers/book-borrow.controller");

router
  .route("/")
  .get(bookBorrowController.findAll)
  .post(bookBorrowController.create)
  .delete(bookBorrowController.deleteAll);

router
  .route("/:id")
  .get(bookBorrowController.findOne)
  .put(bookBorrowController.update)
  .delete(bookBorrowController.delete);

module.exports = router;
