const express = require("express");
const router = express.Router();
const Brand = require("./brand");
const Contact = require("./contact");

router.use("/brand", Brand);
router.use("/contact", Contact);

module.exports = router;
