const express = require("express");
const router = express.Router();
const bookRouter = require("./book.route");
const bookBorrowRouter = require("./book-borrow.route");

router.use("/books", bookRouter);
router.use("/:id/book-borrows", bookBorrowRouter);

router.get("/", (req, res) => {
  res.json({ message: "xin chao, user!" });
});

module.exports = router;
