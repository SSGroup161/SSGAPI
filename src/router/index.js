const express = require("express");
const router = express.Router();
const Brand = require("./brand");
const Contact = require("./contact");
const Article = require("./article");

router.use("/brand", Brand);
router.use("/contact", Contact);
router.use("/article", Article);

module.exports = router;
