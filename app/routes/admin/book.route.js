const express = require("express");
const router = express.Router();
const BookController = require("../../controllers/book.controller");

router
  .route("/")
  .get(BookController.findAll)
  .post(BookController.create)
  .delete(BookController.deleteAll);

router
  .route("/:id")
  .get(BookController.findOne)
  .put(BookController.update)
  .delete(BookController.delete);

module.exports = router;
