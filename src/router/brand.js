const express = require("express");
const router = express.Router();
const { getData } = require("../controller/brandController");

router.get("/", getData);

module.exports = router;
