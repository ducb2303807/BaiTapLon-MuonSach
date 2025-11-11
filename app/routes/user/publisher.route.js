const express = require("express");
const router = express.Router();
const publisherController = require("../../controllers/publisher.controller");

router.route("/").get(publisherController.findAll);

router.route("/:id").get(publisherController.findOne);

module.exports = router;
