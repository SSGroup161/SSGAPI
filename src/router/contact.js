const express = require("express");
const router = express.Router();
const { postDataContact } = require("../controller/contactController");

router.post("/", postDataContact);

module.exports = router;
