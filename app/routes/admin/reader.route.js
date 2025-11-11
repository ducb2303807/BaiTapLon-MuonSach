const express = require("express");
const router = express.Router();
const readerController = require("../../controllers/reader.controller");

router
  .route("/")
  .get(readerController.findAll)
  .post(readerController.create)
  .delete(readerController.deleteAll);

router
  .route("/:id")
  .get(readerController.findOne)
  .put(readerController.update)
  .delete(readerController.delete);
module.exports = router;
