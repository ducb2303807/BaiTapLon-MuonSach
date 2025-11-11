const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/book.controller");

router.route("/").get(bookController.findAll);
router.route("/:id").get(bookController.findOne);

module.exports = router;
