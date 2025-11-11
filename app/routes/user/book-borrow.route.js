const express = require("express");
const router = express.Router({ mergeParams: true });
const BookBorrowController = require("../../controllers/book-borrow.controller");

router.route("/").get(BookBorrowController.findByUser);

router.route("/:borrowId").get(BookBorrowController.findOne);

module.exports = router;
