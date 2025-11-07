const express = require("express");
const router = express.Router();

const readerRouter = require("./reader.route");
const bookRouter = require("./book.route");
const publisherRouter = require("./publisher.route");
const bookBorrowRouter = require("./book-borrow.route");
const staffRouter = require("./staff.route");

router.use("/readers", readerRouter);
router.use("/books", bookRouter);
router.use("/publishers", publisherRouter);
router.use("/borrow-books", bookBorrowRouter);
router.use("/staff", staffRouter);

module.exports = router;
