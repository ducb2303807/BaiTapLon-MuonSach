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
router.use("/book-borrows", bookBorrowRouter);
router.use("/staffs", staffRouter);

router.get("/", (req, res) => {
  res.json({ message: "Xin chao, admin" });
});

module.exports = router;
