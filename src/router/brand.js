const express = require("express");
const router = express.Router();
const { getDataById } = require("../controller/brandController");

router.get("/:id", getDataById);

module.exports = router;
